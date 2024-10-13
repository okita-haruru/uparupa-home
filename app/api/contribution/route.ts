import {NextResponse} from "next/server";
import axios from "axios";

require('dotenv').config();

const GITHUB_API_URL = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;
const ORGANIZATION = process.env.ORGANIZATION;

const headers = {
  'Authorization': `token ${TOKEN}`
};

async function getContributorStats(repoFullName: string) {
  const url = `${GITHUB_API_URL}/repos/${repoFullName}/stats/contributors`;
  let response = await axios.get(url, {headers});

  // Polling until the data is ready
  while (response.status === 202) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    response = await axios.get(url, {headers});
  }

  return response.data;
}

export async function GET() {
  try {
    const repos = await axios.get(`${GITHUB_API_URL}/orgs/${ORGANIZATION}/repos`, {headers})
      .then(res => res.data);
    const members = await axios.get(`${GITHUB_API_URL}/orgs/${ORGANIZATION}/members`, {headers})
      .then(res => res.data);

    const memberLogins = new Set(members.map((member: { login: string; }) => member.login));
    const contributions: { [login: string]: { commits: number, additions: number, deletions: number } } = {};

    await Promise.all(repos.map(async (repo: { full_name: string; }) => {
      const contributors = await axios.get(`${GITHUB_API_URL}/repos/${repo.full_name}/contributors`, {headers})
        .then(res => res.data);

      const stats = await getContributorStats(repo.full_name);

      if (!Array.isArray(stats)) {
        console.error(`Unexpected stats format for ${repo.full_name}:`, stats);
        return;
      }

      for (const contributor of contributors) {
        if (memberLogins.has(contributor.login)) {
          if (!contributions[contributor.login]) {
            contributions[contributor.login] = {commits: 0, additions: 0, deletions: 0};
          }
          contributions[contributor.login].commits += contributor.contributions;

          const contributorStats = stats.find(stat => stat.author.login === contributor.login);
          if (contributorStats) {
            contributorStats.weeks.forEach((week: { a: number, d: number }) => {
              contributions[contributor.login].additions += week.a;
              contributions[contributor.login].deletions += week.d;
            });
          } else {
            console.warn(`No stats found for contributor ${contributor.login} in ${repo.full_name}`);
          }
        }
      }
    }))

    return NextResponse.json(Object.entries(contributions).map(([login, stats]) => ({id: login, ...stats})));
  } catch (e) {
    return NextResponse.json({error: e})
  }
}
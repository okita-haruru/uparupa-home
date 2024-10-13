import axios from "axios";

require('dotenv').config();

const GITHUB_API_URL = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;
const ORGANIZATION = process.env.ORGANIZATION;
const TEAM = process.env.GITHUB_TEAM;

const headers = {
  'Authorization': `token ${TOKEN}`,
  'Accept': 'application/vnd.github.v3+json'
}

interface GithubUser {
  login: string;
  avatar: string;
  html_url: string;
}

export interface DeveloperInfo {
  username: string;
  displayName: string;
  user_page: string;
}

export async function GET() {
  try {
    const members: GithubUser[] = await axios.get(`${GITHUB_API_URL}/orgs/${ORGANIZATION}/teams/${TEAM}/members`, {headers})
      .then(resp => resp.data);

    console.log(members);
  } catch (error) {
    console.error(error);
  }
}
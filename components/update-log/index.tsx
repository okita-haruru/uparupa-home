import React from "react";
import { Card } from "@nextui-org/react";

interface Update {
    version: string;
    date: string;
    content: string;
}

const testData: Update[] = [
    {
        version: '1.0.0',
        date: '2022-01-01',
        content: 'Initial release\n- Feature A\n- Feature B',
    },
    {
        version: '1.1.0',
        date: '2022-02-01',
        content: 'Added feature C\n- Updated feature A\n- Fixed bug in feature B',
    },
    {
        version: '1.1.1',
        date: '2022-02-15',
        content: 'Bug fixes\n- Fixed bug in feature C',
    },
];

export const UpdateLog: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <h1>更新日志</h1>
            <p>这是我们项目的更新日志，你可以在这里查看我们每个版本的更新内容。</p>
            <div style={{ maxWidth: '1500px', width: '100%', overflow: 'auto' }}>
                {testData.map((update, index) => (
                    <Card key={index}  style={{ margin: '20px', padding: '20px' }}>
                        <h2>版本: {update.version}</h2>
                        <h3>更新日期: {update.date}</h3>
                        <pre>{update.content}</pre>
                    </Card>
                ))}
            </div>
        </div>
    );
};
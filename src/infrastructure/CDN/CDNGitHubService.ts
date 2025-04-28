import { inject, injectable } from "tsyringe";
import { ICDNService } from "./interfaces/ICDNService.js";
import { UploadedFile } from "express-fileupload";
import { CDNGitHubConfig } from "./config/CDNGithubConfig.js"

@injectable()
export class CDNGitHubService implements ICDNService {
    private PAT: string;
    private apiURL: string;
    private pagesURL: string;

    constructor(@inject('CDNGitHubConfig') config: CDNGitHubConfig) {
        this.PAT = config.PAT;
        this.apiURL = config.apiURL;
        this.pagesURL = config.pagesURL;
    }

    async upload(file: UploadedFile): Promise<string> {
        const fileName = file.name;
        const contentBase64 = file.data.toString("base64");

        const url = `${this.apiURL}${fileName}`;
        const body = JSON.stringify({
            message: `Upload ${fileName}`,
		    content: contentBase64,
        });

        return fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${this.PAT}`,
                "User-Agent": "NodeServer",
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json",
            },
            body
        }).then(async response => {
            if (!response.ok) {
                const txt = await response.text();
                throw new Error(`GitHub upload failed: ${response.status} ${txt}`);
            }

            return `${this.pagesURL}${fileName}`;
        });
    }

    async delete(fileURL: string): Promise<boolean> {
        const pathName = new URL(fileURL).pathname;
        const filePathInRepo = pathName.replace(/^\/[^/]+\/[^/]+\//, "");
        if (!filePathInRepo) return false;

        const fileSha = await this.getFileSha(filePathInRepo);
        if (!fileSha) return false;

        const url = `${this.apiURL}${filePathInRepo}`;
        const body = JSON.stringify({
            message: `Delete ${filePathInRepo}`,
            sha: fileSha,
        });

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.PAT}`,
                "User-Agent": "NodeServer",
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json",
            },
            body
        });

        return response.ok;
    }

    private async getFileSha(filePath: string): Promise<string | null> {
        const url = `${this.apiURL}${filePath}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.PAT}`,
                "User-Agent": "NodeServer",
                Accept: "application/vnd.github.v3+json",
            }
        });

        if (!response.ok) return null;

        const json = await response.json();
        return json.sha ?? null;
    }
}
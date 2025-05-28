import { inject, injectable } from "tsyringe";
import { ICDNService } from "./interfaces/ICDNService.js";
import { UploadedFile } from "express-fileupload";
import { CDNGitHubConfig } from "./config/CDNGithubConfig.js"

@injectable()
export class CDNGitHubService implements ICDNService {
    // Personal Access Token for GitHub API authentication
    private PAT: string;

    // Base URL for GitHub API calls
    private apiURL: string;

    // URL for accessing the GitHub Pages site (public URL of uploaded files)
    private pagesURL: string;

    constructor(@inject('CDNGitHubConfig') config: CDNGitHubConfig) {
        this.PAT = config.PAT;
        this.apiURL = config.apiURL;
        this.pagesURL = config.pagesURL;
    }

    /**
     * Uploads a file to GitHub repo by converting it to base64 and
     * sending a PUT request to the GitHub content API.
     * Returns the public URL of the uploaded file on success.
     */
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

            // Return the public URL where file is accessible
            return `${this.pagesURL}${fileName}`;
        });
    }

    /**
     * Deletes a file from GitHub repo by:
     * - Extracting file path from the given public URL
     * - Getting the file's SHA hash required by GitHub API
     * - Sending a DELETE request to the GitHub content API
     * Returns true if deletion was successful.
     */
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

    /**
     * Gets the SHA hash of a file in the repo, which is needed
     * to delete or update a file via GitHub API.
     * Returns the SHA string or null if file not found.
     */
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
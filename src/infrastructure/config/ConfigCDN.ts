import { container } from "tsyringe";
import { CDNGitHubService } from "../CDN/CDNGitHubService.js";
import { ICDNService } from "../CDN/interfaces/ICDNService.js";
import { CDNGitHubConfig } from "../CDN/config/CDNGithubConfig.js";

export function configure() {
    // ----- CDN Setup -----
    const cdnGitHubConfig: CDNGitHubConfig = {
        PAT: process.env.GH_CDN_PAT,
        apiURL: process.env.GH_API_URL,
        pagesURL: process.env.GH_PAGES_URL
    }
    container.registerInstance<CDNGitHubConfig>('CDNGitHubConfig', cdnGitHubConfig);
    container.registerSingleton<ICDNService>('CDNGitHubService', CDNGitHubService);
}
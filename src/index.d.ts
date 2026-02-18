export interface Project { title: string; description?: string; url?: string }
export interface PortfolioData { name: string; title?: string; bio?: string; projects?: Project[] }
export declare function createPortfolio(data: PortfolioData): string;
export default createPortfolio;

// 麵包屑格式
export interface BreadcrumbInterface {
    name: string;
    text: string;
    params?: { slug: string };
    query?: { [key: string]: any };
}

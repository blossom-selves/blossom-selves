import PostData from '@/.vitepress/types/PostData';
import { createContentLoader } from 'vitepress';

export default createContentLoader('zh-CN/posts/**/*.md');

export declare const data: PostData[];

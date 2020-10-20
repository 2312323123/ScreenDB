import { ImgInfo } from './imginterface'

export interface ContainerInfo {
    id: string;
    name?: string;
    url: string;
    date: number;
    images: ImgInfo[];
}
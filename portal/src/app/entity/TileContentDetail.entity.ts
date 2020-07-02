export class TileContentDetail{
    elements :TileContentElement[]
}

export class TileContentElement{
    displayText: string;
    src: string;
    iconImageSrc : string
    children: TileContentElement[];
}


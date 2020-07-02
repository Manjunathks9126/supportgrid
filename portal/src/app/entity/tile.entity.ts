export class Tile {
    serviceInstanceId: number;
    customizationId: number;
    position: number;
    header: TileHeader;
    content: TileContent;
    footer: TileFooter;
    src: string;
    tileMetaInfo :any;

    constructor() {

    }
}

export class TileHeader{
    iconImageSrc: string;
    settingsSrc: string;
    displayText: string;
    searchEnabled: Boolean;
}

export class TileContent{
    displaySrc : string;
    logoutUrl : string;
    iconImageSrc: string;
}

export class TileFooter{
    expandTilesEnabled : Boolean;
}
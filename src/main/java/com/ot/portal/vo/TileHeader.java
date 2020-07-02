package com.ot.portal.vo;


import lombok.Getter;

@Getter
public class TileHeader {

	String iconImageSrc;
	String settingsSrc;
	String displayText;
	boolean isSearchEnabled;

	public TileHeader setIconImageSrc(String iconImageSrc) {
		this.iconImageSrc = iconImageSrc;return this;
	}

	public TileHeader setSettingsSrc(String settingsSrc) {
		this.settingsSrc = settingsSrc;return this;
	}

	public TileHeader setDisplayText(String displayText) {
		this.displayText = displayText;return this;
	}

	public TileHeader setSearchEnabled(boolean searchEnabled) {
		isSearchEnabled = searchEnabled;return this;
	}
}


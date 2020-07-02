package com.ot.portal.vo;

import lombok.Getter;

@Getter
public class TileContent {

	String iconImageSrc;
	String displaySrc;
	String logoutUrl;

	public TileContent setIconImageSrc(String iconImageSrc) {
		this.iconImageSrc = iconImageSrc;return this;
	}

	public TileContent setDisplaySrc(String displaySrc) {
		this.displaySrc = displaySrc;return this;
	}

	public TileContent setLogoutUrl(String logoutUrl) {
		this.logoutUrl = logoutUrl;return this;
	}

	@Override
	public String toString() {
		return "TileContentVO [iconImageSrc=" + iconImageSrc + ", displaySrc=" + displaySrc + ", logoutUrl=" + logoutUrl
				+ "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((displaySrc == null) ? 0 : displaySrc.hashCode());
		result = prime * result + ((iconImageSrc == null) ? 0 : iconImageSrc.hashCode());
		result = prime * result + ((logoutUrl == null) ? 0 : logoutUrl.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TileContent other = (TileContent) obj;
		if (displaySrc == null) {
			if (other.displaySrc != null)
				return false;
		} else if (!displaySrc.equals(other.displaySrc))
			return false;
		if (iconImageSrc == null) {
			if (other.iconImageSrc != null)
				return false;
		} else if (!iconImageSrc.equals(other.iconImageSrc))
			return false;
		if (logoutUrl == null) {
			if (other.logoutUrl != null)
				return false;
		} else if (!logoutUrl.equals(other.logoutUrl))
			return false;
		return true;
	}

}

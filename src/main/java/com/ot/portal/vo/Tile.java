package com.ot.portal.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class Tile implements Comparable<Tile> {

	private Long serviceInstanceId;
	private Long customizationId;
	private Integer position;
	private String src;
	private TileHeader header;
	private TileContent content;
	private Map<String, Object> tileMetaInfo;

	public Tile(){}

	public Tile(Long serviceInstanceId,String src,TileHeader header,TileContent content){
		this.serviceInstanceId = serviceInstanceId;
		this.src = src;
		this.header = header;
		this.content = content;
	}

	@Override
	public int compareTo(Tile o) {
		if (this.position == null || o.position == null)
			return 0;

		return this.position == o.position ? 0 : this.position.compareTo(o.position);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result + ((customizationId == null) ? 0 : customizationId.hashCode());
		result = prime * result + ((header == null) ? 0 : header.hashCode());
		result = prime * result + ((serviceInstanceId == null) ? 0 : serviceInstanceId.hashCode());
		result = prime * result + ((position == null) ? 0 : position.hashCode());
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
		Tile other = (Tile) obj;
		if (content == null) {
			if (other.content != null)
				return false;
		} else if (!content.equals(other.content))
			return false;
		if (customizationId == null) {
			if (other.customizationId != null)
				return false;
		} else if (!customizationId.equals(other.customizationId))
			return false;
		if (header == null) {
			if (other.header != null)
				return false;
		} else if (!header.equals(other.header))
			return false;
		if (serviceInstanceId == null) {
			if (other.serviceInstanceId != null)
				return false;
		} else if (!serviceInstanceId.equals(other.serviceInstanceId))
			return false;
		if (position == null) {
			if (other.position != null)
				return false;
		} else if (!position.equals(other.position))
			return false;
		return true;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Tile [serviceInstanceId=");
		builder.append(serviceInstanceId);
		builder.append(", customizationId=");
		builder.append(customizationId);
		builder.append(", position=");
		builder.append(position);
		builder.append(", src=");
		builder.append(src);
		builder.append(", header=");
		builder.append(header);
		builder.append(", content=");
		builder.append(content);
		builder.append(", tileMetaInfo=");
		builder.append(tileMetaInfo);
		builder.append("]");
		return builder.toString();
	}

}



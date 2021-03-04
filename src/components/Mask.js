import React from "react";
import masksImage from "../image/masks.png";
export default function Mask({ filterMasks, filterAdult, filterChildren }) {
  if (filterAdult) {
    filterMasks = filterMasks.filter(masks => {
      return masks.properties.mask_adult > 0;
    });
  }
  if (filterChildren) {
    filterMasks = filterMasks.filter(masks => {
      return masks.properties.mask_child > 0;
    });
  }
  // console.log(filterMasks);
  // filterMasks = filterMasks.filter(ma => {
  //   return ma.properties.mask_adult > 0;
  // });
  filterMasks.sort((a, b) => {
    return b.properties.mask_adult - a.properties.mask_adult;
  });

  return (
    <div className="mask-flex">
      {filterMasks.map(mask => (
        <div className="card mb-5 mask-fix">
          <img src={masksImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title mb-3">
              <b>{mask.properties.name}</b>
            </h5>
            <p className="card-text text-left">
              <i className="fa fa-male fa-fiexed" aria-hidden="true"></i>
              {mask.properties.mask_adult}
            </p>
            <p className="card-text text-left">
              <i className="fa fa-child fa-fiexed" aria-hidden="true"></i>
              {mask.properties.mask_child}
            </p>
            <p className="card-text text-left">
              <i className="fa fa-map-marker fa-fiexed" aria-hidden="true"></i>
              {mask.properties.address}
            </p>
            <p className="card-text text-left">
              <i className="fa fa-phone fa-fiexed" aria-hidden="true"></i>
              {mask.properties.phone}
            </p>
            <p className="card-text text-left" style={{ color: "#95ADBE" }}>
              <small>更新時間：{mask.properties.updated}</small>
            </p>
          </div>
          <div className="card-footer">
            <a
              className="btn btn-dark btn-block"
              href={`https://www.google.com.tw/maps/place/${mask.properties.address.replace(
                " ",
                ""
              )}/`}
              target="_blank"
            >
              地圖查看
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./review.css";
import ReactPaginate from "react-paginate";
import ResetLocation from "../../helpers/ResetLocation";

const reviews = [
  {
    MaPhieuDanhGia: 1,
    DiemPhucVu: 5,
    DiemChatLuongMonAn: 3,
    DiemGiaCa: 5,
    DiemViTriChiNhanh: 3,
    DiemKhongGian: 5,
    BinhLuan: null,
    ThoiDiemTruyCap: "2010-04-06T05:39:00.460",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TT",
    MaHoaDon: 727,
  },
  {
    MaPhieuDanhGia: 2,
    DiemPhucVu: 4,
    DiemChatLuongMonAn: 1,
    DiemGiaCa: 2,
    DiemViTriChiNhanh: 3,
    DiemKhongGian: 5,
    BinhLuan: null,
    ThoiDiemTruyCap: "2016-09-09T13:06:06.020",
    ThoiGianTruyCap: 15,
    LoaiDGDV: "TT",
    MaHoaDon: 818,
  },
  {
    MaPhieuDanhGia: 3,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 4,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 5,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 6,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 7,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 8,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 9,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 10,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 11,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 12,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 14,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  {
    MaPhieuDanhGia: 15,
    DiemPhucVu: 1,
    DiemChatLuongMonAn: 5,
    DiemGiaCa: 3,
    DiemViTriChiNhanh: 2,
    DiemKhongGian: 5,
    BinhLuan:
      "your Enter text your Enter text text text text your here text your Enter here here here text Enter text",
    ThoiDiemTruyCap: "2014-03-04T21:06:07.150",
    ThoiGianTruyCap: 6,
    LoaiDGDV: "TC",
    MaHoaDon: 769,
  },
  // Tiếp tục thêm các phần tử từ dữ liệu của bạn
];

const Review = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(itemOffset + 5);
  const [currentReviews, setCurrentReviews] = useState([
    ...reviews.reverse().slice(itemOffset, endOffset),
  ]);
  const [pageCountReviews, setPageCountReviews] = useState(
    Math.ceil(reviews.length / 5)
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % reviews.length;
    setItemOffset(newOffset);
    ResetLocation();
  };

  useEffect(() => {
    document.title = "Review | Pizza Time";
    setEndOffset(itemOffset + 5);
    setCurrentReviews([...reviews].reverse().slice(itemOffset, endOffset));
    setPageCountReviews(Math.ceil(reviews.length / 5));
  }, [setEndOffset, endOffset, itemOffset]);
  return (
    <div className="review-container">
      <h1>Danh Sách Đánh Giá Dịch Vụ</h1>
      <div className="review-list">
        {currentReviews.map((review) => (
          <div key={review.MaPhieuDanhGia} className="review-item">
            <div className="review-header">
              <h3>Mã Đánh Giá: {review.MaPhieuDanhGia}</h3>
              <p>
                Loại DGDV: <span>{review.LoaiDGDV}</span>
              </p>
            </div>
            <div className="review-body">
              <p>
                <strong>Điểm Phục Vụ:</strong> {review.DiemPhucVu}
              </p>
              <p>
                <strong>Điểm Chất Lượng Món Ăn:</strong>{" "}
                {review.DiemChatLuongMonAn}
              </p>
              <p>
                <strong>Điểm Giá Cả:</strong> {review.DiemGiaCa}
              </p>
              <p>
                <strong>Điểm Vị Trí Chi Nhánh:</strong>{" "}
                {review.DiemViTriChiNhanh}
              </p>
              <p>
                <strong>Điểm Không Gian:</strong> {review.DiemKhongGian}
              </p>
              <p>
                <strong>Bình Luận:</strong> {review.BinhLuan || "Không có"}
              </p>
            </div>
            <div className="review-footer">
              <p>
                <strong>Ngày Đánh Giá:</strong>{" "}
                {new Date(review.ThoiDiemTruyCap).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        className="review-pagination"
        breakLabel="..."
        nextLabel="&#62;"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCountReviews}
        previousLabel="&#60;"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Review;

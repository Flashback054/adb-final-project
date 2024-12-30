import React, { useState } from "react";
import { motion } from "framer-motion";
import "./branch.css";

const Branch = () => {
  const branches = [
    {
      MaChiNhanh: 1,
      TenChiNhanh: "Chi Nhánh 1",
      DiaChi: "123 Đường A, Thành phố X",
      GioMoCua: "08:00:00",
      GioDongCua: "22:00:00",
      BaiXeMay: 1,
      BaiOTo: 1,
    },
    {
      MaChiNhanh: 2,
      TenChiNhanh: "Chi Nhánh 2",
      DiaChi: "456 Đường B, Thành phố Y",
      GioMoCua: "09:00:00",
      GioDongCua: "21:30:00",
      BaiXeMay: 1,
      BaiOTo: 0,
    },
    {
      MaChiNhanh: 3,
      TenChiNhanh: "Chi Nhánh 3",
      DiaChi: "789 Đường C, Thành phố Z",
      GioMoCua: "07:30:00",
      GioDongCua: "23:00:00",
      BaiXeMay: 1,
      BaiOTo: 1,
    },
    {
      MaChiNhanh: 4,
      TenChiNhanh: "Chi Nhánh 4",
      DiaChi: "111 Đường D, Thành phố W",
      GioMoCua: "08:15:00",
      GioDongCua: "22:15:00",
      BaiXeMay: 0,
      BaiOTo: 1,
    },
    {
      MaChiNhanh: 5,
      TenChiNhanh: "Chi Nhánh 5",
      DiaChi: "222 Đường E, Thành phố V",
      GioMoCua: "09:00:00",
      GioDongCua: "20:30:00",
      BaiXeMay: 1,
      BaiOTo: 0,
    },
    {
      MaChiNhanh: 6,
      TenChiNhanh: "Chi Nhánh 6",
      DiaChi: "333 Đường F, Thành phố U",
      GioMoCua: "08:00:00",
      GioDongCua: "22:00:00",
      BaiXeMay: 0,
      BaiOTo: 1,
    },
    {
      MaChiNhanh: 7,
      TenChiNhanh: "Chi Nhánh 7",
      DiaChi: "444 Đường G, Thành phố T",
      GioMoCua: "10:00:00",
      GioDongCua: "22:30:00",
      BaiXeMay: 1,
      BaiOTo: 1,
    },
    {
      MaChiNhanh: 8,
      TenChiNhanh: "Chi Nhánh 8",
      DiaChi: "555 Đường H, Thành phố S",
      GioMoCua: "09:30:00",
      GioDongCua: "23:00:00",
      BaiXeMay: 0,
      BaiOTo: 1,
    },
    {
      MaChiNhanh: 9,
      TenChiNhanh: "Chi Nhánh 9",
      DiaChi: "666 Đường I, Thành phố R",
      GioMoCua: "08:00:00",
      GioDongCua: "21:00:00",
      BaiXeMay: 1,
      BaiOTo: 0,
    },
    {
      MaChiNhanh: 10,
      TenChiNhanh: "Chi Nhánh 10",
      DiaChi: "777 Đường J, Thành phố Q",
      GioMoCua: "07:00:00",
      GioDongCua: "20:00:00",
      BaiXeMay: 1,
      BaiOTo: 1,
    },
  ];

  return (
    <motion.main
      className="blog"
      initial={{ opacity: 0, translateX: -300 }}
      whileInView={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -300 }}
      transition={{ duration: 1 }}
    >
      <div className="branch_container">
        <h1>Danh Sách Các Chi Nhánh</h1>
        <section className="branch__posts">
          {branches.map((branch) => (
            <div className="branch__item">
              <h3>{branch.TenChiNhanh}</h3>
              <p>
                <strong>Địa Chỉ:</strong> {branch.DiaChi}
              </p>
              <p>
                <strong>Giờ Mở Cửa:</strong> {branch.GioMoCua}
              </p>
              <p>
                <strong>Giờ Đóng Cửa:</strong> {branch.GioDongCua}
              </p>
              <p>
                <strong>Bãi Xe Máy:</strong> {branch.BaiXeMay ? "Có" : "Không"}
              </p>
              <p>
                <strong>Bãi Ô Tô:</strong> {branch.BaiOTo ? "Có" : "Không"}
              </p>
            </div>
          ))}
        </section>
      </div>
    </motion.main>
  );
};

export default Branch;

USE [SuShiX]
GO
SET IDENTITY_INSERT [dbo].[MON] ON 

INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (1, N'Trứng hấp', CAST(25000.00 AS Decimal(18, 2)), N'Khai vị', N'trung_hap.jpg', N'Món khai vị truyền thống, hấp mềm mịn, thơm ngon.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (2, N'Edamame', CAST(20000.00 AS Decimal(18, 2)), N'Khai vị', N'edamame.jpg', N'Đậu nành Nhật luộc, rắc muối nhẹ, dùng kèm bia rất ngon.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (3, N'Gyoza chiên', CAST(45000.00 AS Decimal(18, 2)), N'Khai vị', N'gyoza.jpg', N'Bánh gyoza nhân thịt heo và rau củ, chiên vàng giòn.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (4, N'Sashimi cá hồi', CAST(300000.00 AS Decimal(18, 2)), N'Sashimi combo', N'sashimi_cahoi.jpg', N'Cá hồi tươi, thái lát dày, vị béo ngậy.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (5, N'Sashimi cá ngừ', CAST(350000.00 AS Decimal(18, 2)), N'Sashimi combo', N'sashimi_cangu.jpg', N'Cá ngừ tươi ngon, thái lát, vị ngọt tự nhiên.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (6, N'Sashimi tổng hợp', CAST(500000.00 AS Decimal(18, 2)), N'Sashimi combo', N'sashimi_tonghop.jpg', N'Tổng hợp các loại sashimi: cá hồi, cá ngừ, sò đỏ, tôm.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (7, N'Sashimi bạch tuộc', CAST(250000.00 AS Decimal(18, 2)), N'Sashimi combo', N'sashimi_bachtuoc.jpg', N'Bạch tuộc tươi sống, thái lát mỏng, ăn kèm nước tương.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (8, N'Nigiri cá hồi (2 miếng)', CAST(70000.00 AS Decimal(18, 2)), N'Nigiri', N'nigiri_cahoi.jpg', N'Cơm cuộn với cá hồi tươi sống.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (9, N'Nigiri cá ngừ (2 miếng)', CAST(75000.00 AS Decimal(18, 2)), N'Nigiri', N'nigiri_cangu.jpg', N'Cơm cuộn với cá ngừ tươi, vị đậm đà.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (10, N'Nigiri tôm (2 miếng)', CAST(80000.00 AS Decimal(18, 2)), N'Nigiri', N'nigiri_tom.jpg', N'Tôm hấp tươi đặt trên cơm cuộn.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (11, N'Nigiri sò đỏ (2 miếng)', CAST(85000.00 AS Decimal(18, 2)), N'Nigiri', N'nigiri_sodo.jpg', N'Sò đỏ giòn ngọt, đặt trên cơm sushi.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (12, N'Maki cá hồi', CAST(60000.00 AS Decimal(18, 2)), N'Maki', N'maki_cahoi.jpg', N'Cơm cuộn với cá hồi, rong biển bên ngoài.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (13, N'Maki dưa leo', CAST(45000.00 AS Decimal(18, 2)), N'Maki', N'maki_dualeo.jpg', N'Cơm cuộn dưa leo tươi mát, thích hợp cho người ăn chay.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (14, N'Maki cá ngừ', CAST(65000.00 AS Decimal(18, 2)), N'Maki', N'maki_cangu.jpg', N'Cơm cuộn cá ngừ tươi, hương vị tinh tế.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (15, N'Tempura tôm', CAST(90000.00 AS Decimal(18, 2)), N'Tempura', N'tempura_tom.jpg', N'Tôm chiên giòn với lớp bột tempura mỏng nhẹ.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (16, N'Tempura rau củ', CAST(70000.00 AS Decimal(18, 2)), N'Tempura', N'tempura_rau.jpg', N'Rau củ tươi chiên giòn, hương vị thanh nhẹ.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (17, N'Udon hải sản', CAST(120000.00 AS Decimal(18, 2)), N'Udon', N'udon_haisan.jpg', N'Udon với hải sản tươi, nước dùng đậm đà.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (18, N'Udon bò', CAST(110000.00 AS Decimal(18, 2)), N'Udon', N'udon_bo.jpg', N'Udon thịt bò thái lát, nước dùng vị ngọt thanh.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (19, N'Set sushi tổng hợp', CAST(350000.00 AS Decimal(18, 2)), N'Món đặc biệt', N'set_sushi.jpg', N'Set sushi với đầy đủ nigiri, maki, sashimi.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (20, N'Lẩu shabu shabu', CAST(400000.00 AS Decimal(18, 2)), N'Món đặc biệt', N'lau_shabu.jpg', N'Lẩu Nhật Bản với nước dùng thanh, thịt và rau tươi.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (21, N'Trà xanh Nhật', CAST(30000.00 AS Decimal(18, 2)), N'Các món nước', N'tra_xanh.jpg', N'Trà xanh nguyên chất, giúp thanh lọc cơ thể.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (22, N'Rượu sake', CAST(80000.00 AS Decimal(18, 2)), N'Các món nước', N'ruou_sake.jpg', N'Rượu truyền thống Nhật Bản, thơm nhẹ.')
INSERT [dbo].[MON] ([MaMon], [TenMon], [GiaHienTai], [DanhMuc], [HinhAnh], [MoTa]) VALUES (23, N'Nước ép táo', CAST(40000.00 AS Decimal(18, 2)), N'Các món nước', N'nuoc_ep_tao.jpg', N'Nước ép táo tươi nguyên chất, không đường.')
SET IDENTITY_INSERT [dbo].[MON] OFF
GO

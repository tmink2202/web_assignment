/* BÀI B — VIẾT CODE: Giỏ hàng của xưởng in
   Hoàn thiện class GioHang và hàm napGioHang.
   Không đổi tên class, tên phương thức, tên hàm; không sửa phần "DỮ LIỆU ĐÃ CHO". */

// ---------- DỮ LIỆU ĐÃ CHO (không sửa) ----------
const DANH_MUC = [
	{ id: "TC01", ten: "Thiệp cưới cotton", loai: "thiep cuoi", gia: 1500 },
	{ id: "TC02", ten: "Thiệp cưới kraft", loai: "thiep cuoi", gia: 900 },
	{ id: "DT01", ten: "Danh thiếp ép kim", loai: "danh thiep", gia: 1200 },
	{ id: "PB01", ten: "Phong bì lót lụa", loai: "phu kien", gia: 500 }
];

// ---------- PHẦN BẠN VIẾT ----------
class GioHang {
	constructor() {
		this.dsDong = [];
	}

	them(sanPham, soLuong) {
		if (typeof soLuong !== "number" || !Number.isInteger(soLuong) || soLuong <= 0) {
			return false;
		}
		const dong = this.dsDong.find(d => d.id === sanPham.id);
		if (dong !== undefined) {
			dong.soLuong += soLuong;
		} else {
			this.dsDong.push({
				id: sanPham.id,
				ten: sanPham.ten,
				loai: sanPham.loai,
				gia: sanPham.gia,
				soLuong: soLuong
			});
		}
		return true;
	}

	xoa(id) {
		const viTri = this.dsDong.findIndex(d => d.id === id);
		if (viTri === -1) {
			return false;
		}
		this.dsDong.splice(viTri, 1);
		return true;
	}

	tongTien() {
		return this.dsDong.reduce((tong, d) => tong + d.gia * d.soLuong, 0);
	}

	thongKeTheoLoai() {
		const ketQua = {};
		for (const d of this.dsDong) {
			ketQua[d.loai] = (ketQua[d.loai] || 0) + d.gia * d.soLuong;
		}
		return ketQua;
	}

	dongDatNhat() {
		const ds = this.layDanhSach();
		if (ds.length === 0) {
			return null;
		}
		return ds.reduce((max, d) => d.thanhTien > max.thanhTien ? d : max);
	}

	layDanhSach() {
		return this.dsDong.map(d => ({ ...d, thanhTien: d.gia * d.soLuong }));
	}

	xuatJSON() {
		return JSON.stringify(this.dsDong);
	}
}

function napGioHang(chuoiJSON) {
	const gio = new GioHang();
	gio.dsDong = JSON.parse(chuoiJSON);
	return gio;
}

// ---------- CHẠY THỬ (không sửa) ----------
const gio = new GioHang();
gio.them(DANH_MUC[0], 100);
gio.them(DANH_MUC[3], 200);
gio.them(DANH_MUC[0], 50);
veGioHang(gio.layDanhSach(), gio.tongTien());
console.table(gio.layDanhSach());
hienThi(`JSON gửi lên máy chủ: ${gio.xuatJSON()}`);

export function validateTitle(value: string): string {
  if (value.trim().length < 3) {
    return "Tên sách phải có ít nhất 3 ký tự";
  }
  return "";
}

export function validateAuthor(value: string): string {
  if (value.trim() === "") {
    return "Vui lòng nhập tác giả";
  }
  return "";
}

export function validateGenre(value: string): string {
  if (value === "") {
    return "Vui lòng chọn thể loại";
  }
  return "";
}

export function validateYear(value: string): string {
  const year = Number(value);
  const nowYear = new Date().getFullYear();
  if (value === "" || !Number.isInteger(year) || year < 1900 || year > nowYear) {
    return "Năm phải từ 1900 đến " + nowYear;
  }
  return "";
}

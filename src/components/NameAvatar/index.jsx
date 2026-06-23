// 1. Hàm tách chữ cái đầu từ Fullname
const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  
  // Nếu tên chỉ có 1 từ (vd: "Sang")
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  // Nếu tên có nhiều từ, lấy chữ cái của từ đầu và từ cuối
  const firstLetter = words[0].charAt(0);
  const lastLetter = words[words.length - 1].charAt(0);
  
  return (firstLetter + lastLetter).toUpperCase();
};

// 2. Hàm băm chuỗi thành mã màu Hex cố định
const stringToColor = (string) => {
  if (!string) return "#CCCCCC"; // Màu xám mặc định nếu không có tên
  
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  
  return color;
};

// 3. Component Avatar
export default function NameAvatar({ name, size = 40 }) {
  const initials = getInitials(name);
  const bgColor = stringToColor(name);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bgColor,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size / 2.5, // Tự động scale chữ theo kích thước vòng tròn
        fontWeight: 'bold',
        textTransform: 'uppercase',
        userSelect: 'none', // Không cho người dùng bôi đen chữ
      }}
      title={name} // Hover chuột vào sẽ hiện full tên
    >
      {initials}
    </div>
  );
}
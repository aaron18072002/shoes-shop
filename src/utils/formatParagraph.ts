export default function formatParagraph(paragraph: string, lineLength: number = 3) {
    // Thay thế tất cả các dấu cách thừa bằng một dấu cách
    paragraph = paragraph.replace(/\s+/g, ' ');

    // Tạo một mảng các từ trong đoạn văn
    const words = paragraph.split(' ');

    // Tạo một mảng các dòng văn bản
    const lines = [];
    let line = '';
    for (const word of words) {
        // Nếu dòng hiện tại vượt quá chiều dài dòng, thêm dòng hiện tại vào mảng các dòng và bắt đầu một dòng mới
        if (line.length + word.length > lineLength) {
            lines.push(line);
            line = '';
        }

        // Thêm từ vào dòng hiện tại
        line += word + ' ';
    }

    // Thêm dòng hiện tại vào mảng các dòng
    lines.push(line);

    // Trả về mảng các dòng đã được định dạng
    return lines.join('\n');
}

import { AutomationRule } from '../types/sop';

export const INITIAL_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: 'AUTO-01',
    name: 'Kích hoạt ứng phó tai nạn khẩn cấp (SLA 5 phút & 15 phút)',
    triggerEvent: 'Tài xế bấm báo sự cố khẩn cấp trên xe / app',
    condition: 'Có tín hiệu va chạm hoặc tài xế gửi biên bản HR-F13',
    targetSop: 'HR-SOP-12',
    targetStep: 3,
    autoAction: 'Tự động tạo nhiệm vụ Điều độ khẩn cấp (SLA 15 phút), báo động cho Đội An toàn & HR, khóa bảo toàn camera/GPS',
    assignedRole: 'ĐĐ',
    isActive: true,
    lastTriggered: '10 phút trước',
    executionCount: 14
  },
  {
    id: 'AUTO-02',
    name: 'Cảnh báo vi phạm trần thời gian lái xe (4h / 10h / 48h)',
    triggerEvent: 'GPS / Thiết bị giám sát hành trình báo thời gian lái xe',
    condition: 'Lái liên tục ≥ 3.8 giờ HOẶC ngày ≥ 9.5 giờ HOẶC tuần ≥ 46 giờ',
    targetSop: 'HR-SOP-05',
    targetStep: 2,
    autoAction: 'Phát thông báo đẩy yêu cầu tài xế táp lề trạm nghỉ 30 phút; tạo cảnh báo giám sát gửi chuyên viên An toàn',
    assignedRole: 'AT',
    isActive: true,
    lastTriggered: '22 phút trước',
    executionCount: 89
  },
  {
    id: 'AUTO-03',
    name: 'Tự động khóa điều xe khi GPLX / Giấy khám sức khỏe hết hạn',
    triggerEvent: 'Hệ thống quét định kỳ hồ sơ giấy tờ lúc 00:00 hàng ngày',
    condition: 'GPLX hoặc Giấy khám sức khỏe tài xế quá hạn hiệu lực',
    targetSop: 'HR-SOP-04',
    targetStep: 4,
    autoAction: 'Chuyển trạng thái tài xế sang "Đình chỉ điều xe", gửi thông báo cảnh báo HR hỗ trợ cấp đổi và thông báo Điều độ không xếp ca',
    assignedRole: 'HR',
    isActive: true,
    lastTriggered: 'Hôm nay lúc 00:01',
    executionCount: 6
  },
  {
    id: 'AUTO-04',
    name: 'Xử lý vi phạm an toàn cabin từ Camera AI (SLA 24 giờ)',
    triggerEvent: 'Camera AI nhận diện dấu hiệu ngủ gật, cúi nhìn điện thoại, lấn làn',
    condition: 'Tần suất vi phạm ≥ 2 lần trong ca hoặc phát hiện ngủ gật',
    targetSop: 'HR-SOP-11',
    targetStep: 3,
    autoAction: 'Tạo nhiệm vụ xác minh video cho Bộ phận An toàn (hạn chót giải quyết trong 24 giờ), lưu trữ nhật ký',
    assignedRole: 'AT',
    isActive: true,
    lastTriggered: '35 phút trước',
    executionCount: 42
  },
  {
    id: 'AUTO-05',
    name: 'Tự động chuyển luồng Onboarding khi tài xế đạt sát hạch lái thử',
    triggerEvent: 'Giáo viên chấm đạt phiếu kiểm tra đầu vào HR-F03 (≥ 80 điểm)',
    condition: 'Không vi phạm nồng độ cồn/ma túy và kỹ năng lái thử đạt',
    targetSop: 'HR-SOP-03',
    targetStep: 1,
    autoAction: 'Tự động sinh bộ Checklist Onboarding tài xế HR-F06, chỉ định Mentor hướng dẫn chạy kèm 3-5 chuyến',
    assignedRole: 'HR',
    isActive: true,
    lastTriggered: 'Hôm qua lúc 16:30',
    executionCount: 28
  },
  {
    id: 'AUTO-06',
    name: 'Tự động kích hoạt quy trình thôi việc & bàn giao xe (SLA 14 ngày)',
    triggerEvent: 'Tiếp nhận đơn xin thôi việc HR-F15 đã được phê duyệt',
    condition: 'Hết thời hạn báo trước quy định hoặc thỏa thuận nghỉ',
    targetSop: 'HR-SOP-15',
    targetStep: 3,
    autoAction: 'Kích hoạt lịch phỏng vấn HR-F19, tạo Checklist bàn giao xe/tài sản HR-F16 và đặt đồng hồ đếm ngược 14 ngày thanh toán',
    assignedRole: 'QL',
    isActive: true,
    lastTriggered: '2 ngày trước',
    executionCount: 19
  },
  {
    id: 'AUTO-07',
    name: 'Kiểm soát hạn mức làm thêm giờ theo Bộ luật Lao động & NĐ 283/2026',
    triggerEvent: 'Gửi phiếu đăng ký làm thêm giờ HR-F09',
    condition: 'Tổng giờ làm thêm tháng > 40h HOẶC tổng năm > 200h HOẶC giờ lái ngày > 10h',
    targetSop: 'HR-SOP-05',
    targetStep: 3,
    autoAction: 'Tự động chặn phê duyệt và gửi cảnh báo đỏ vi phạm quy định pháp luật lao động/giao thông',
    assignedRole: 'HR',
    isActive: true,
    lastTriggered: '3 ngày trước',
    executionCount: 8
  }
];

import { SopDefinition, FormTemplate, DriverTelemetry, SopTask, AnnualEvent, RoadmapMilestone } from '../types/sop';

export const SOP_LIST: SopDefinition[] = [
  {
    code: 'HR-SOP-01',
    title: 'Hoạch định nhân sự và tuyển dụng',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự (tuyển dụng)',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Bảo đảm tuyển đúng người, đúng thời điểm, trong định biên và ngân sách, cho cả khối văn phòng (100 người) và khối tài xế (400 người, nhu cầu tuyển liên tục do biến động cao).',
    scope: 'Mọi vị trí trong công ty. Luồng A: Khối văn phòng (điều hành, kinh doanh, kế toán, kho, IT, nhân sự...). Luồng B: Tài xế (xe tải, đầu kéo, xe khách...). Tài xế bắt buộc thực hiện thêm SOP-02.',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'R', dd: 'C', at: 'I', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Lập kế hoạch nhân sự và rà soát định biên',
        description: 'Khối tài xế tính định biên theo số xe và mô hình khai thác (1.2 - 1.5 tài xế/xe; tuyến dài cần lái xe thay phiên), cộng dự phòng theo tỷ lệ nghỉ việc.',
        assignedRole: 'HR',
        sla: 'Tháng 11 hàng năm, rà soát mỗi quý',
        slaDays: 90,
        outputName: 'Kế hoạch định biên',
      },
      {
        stepNumber: 2,
        title: 'Lập phiếu đề xuất tuyển dụng',
        description: 'Vị trí, số lượng, lý do, mô tả công việc, yêu cầu, khung lương. Kiểm tra định biên và ngân sách.',
        assignedRole: 'QL',
        sla: '2 ngày làm việc',
        slaHours: 16,
        outputName: 'Phiếu HR-F01',
        outputFormCode: 'HR-F01',
      },
      {
        stepNumber: 3,
        title: 'Phê duyệt đề xuất',
        description: 'Tài xế trong định biên do Trưởng phòng NS duyệt; vị trí mới, ngoài định biên hoặc cấp quản lý do Ban Giám đốc duyệt.',
        assignedRole: 'BGĐ',
        sla: '2 ngày làm việc',
        slaHours: 16,
        outputName: 'Phiếu đã duyệt',
        isDecision: true,
        decisionCondition: 'Định biên & ngân sách đạt chuẩn?',
      },
      {
        stepNumber: 4,
        title: 'Chuẩn bị JD và đăng kênh tuyển',
        description: 'Văn phòng: website, mạng xã hội, headhunter. Tài xế: giới thiệu nội bộ có thưởng, hội nhóm tài xế, trung tâm đào tạo, bãi xe.',
        assignedRole: 'HR',
        sla: '1 ngày làm việc',
        slaHours: 8,
        outputName: 'Tin tuyển dụng',
      },
      {
        stepNumber: 5,
        title: 'Sàng lọc hồ sơ ứng viên',
        description: 'Kiểm tra tiêu chí. Với tài xế: kiểm tra hạng GPLX phù hợp loại xe, thời hạn, kinh nghiệm thực tế.',
        assignedRole: 'HR',
        sla: '3 ngày làm việc',
        slaHours: 24,
        outputName: 'Danh sách đạt sơ tuyển',
      },
      {
        stepNumber: 6,
        title: 'Phỏng vấn ứng viên',
        description: 'Văn phòng: vòng 1 HR, vòng 2 QL, vòng 3 Giám đốc (nếu trưởng phòng). Tài xế: HR phỏng vấn ngắn rồi chuyển SOP-02 sát hạch.',
        assignedRole: 'HR',
        sla: '5 ngày làm việc',
        slaHours: 40,
        outputName: 'Phiếu HR-F02',
        outputFormCode: 'HR-F02',
      },
      {
        stepNumber: 7,
        title: 'Kiểm tra tham chiếu nơi cũ',
        description: 'Cần sự đồng ý của ứng viên. Với tài xế: hỏi kỹ lịch sử vi phạm, va chạm, tai nạn.',
        assignedRole: 'HR',
        sla: '2 ngày làm việc',
        slaHours: 16,
        outputName: 'Báo cáo tham chiếu',
      },
      {
        stepNumber: 8,
        title: 'Đề xuất lương và duyệt offer',
        description: 'Đề xuất theo thang bảng lương chuẩn công ty; trình cấp có thẩm quyền phê duyệt.',
        assignedRole: 'HR',
        sla: '2 ngày làm việc',
        slaHours: 16,
        outputName: 'Offer được duyệt',
      },
      {
        stepNumber: 9,
        title: 'Gửi thư mời nhận việc',
        description: 'Gửi qua email/văn bản kèm quy định hồ sơ cần mang. Nếu từ chối, chuyển ứng viên dự phòng.',
        assignedRole: 'HR',
        sla: '3 ngày làm việc',
        slaHours: 24,
        outputName: 'Thư mời HR-F04',
        outputFormCode: 'HR-F04',
        isDecision: true,
        decisionCondition: 'Ứng viên đồng ý offer?',
      },
      {
        stepNumber: 10,
        title: 'Bàn giao sang Onboarding',
        description: 'Bàn giao thông tin cho quy trình SOP-03 Tiếp nhận thử việc, lưu trữ hồ sơ tuyển dụng.',
        assignedRole: 'HR',
        sla: '1 ngày làm việc',
        slaHours: 8,
        outputName: 'Hồ sơ ứng viên',
      }
    ],
    legalFramework: [
      'Điều 17 Bộ luật Lao động 2019: Không phân biệt đối xử giới tính, dân tộc, tôn giáo; không giữ bản chính văn bằng chứng chỉ.',
      'Đánh giá tài xế dựa trên sức khỏe, kỹ năng, an toàn thực tế.'
    ],
    relatedForms: ['HR-F01', 'HR-F02', 'HR-F04'],
    kpis: [
      { indicator: 'Thời gian tuyển văn phòng', target: '≤ 30 ngày' },
      { indicator: 'Thời gian tuyển tài xế', target: '≤ 10 ngày' },
      { indicator: 'Tỷ lệ chấp nhận offer', target: '≥ 80%' },
      { indicator: 'Tỷ lệ nghỉ trong 90 ngày đầu (tài xế)', target: '≤ 20%' }
    ]
  },
  {
    code: 'HR-SOP-02',
    title: 'Kiểm tra đầu vào và sát hạch tài xế',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự phối hợp Bộ phận An toàn',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Bảo đảm mọi tài xế trước khi nhận xe đều đủ điều kiện pháp lý, sức khỏe, tay nghề và hồ sơ an toàn, nhằm giảm rủi ro tai nạn và trách nhiệm pháp lý của công ty.',
    scope: 'Tất cả ứng viên vị trí lái xe (lái xe chính, phụ xe kiêm lái, thời vụ) và tài xế chuyển loại xe/tuyến.',
    targetAudience: 'Khối tài xế',
    raci: { hr: 'R', ql: 'C', dd: 'C', at: 'R', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Tiếp nhận hồ sơ lái xe',
        description: 'CCCD, GPLX đúng hạng, giấy khám sức khỏe tài xế còn hạn, lý lịch tư pháp/xác nhận địa phương, xác nhận kinh nghiệm.',
        assignedRole: 'HR',
        sla: 'Ngày 1',
        slaHours: 8,
        outputName: 'Hồ sơ đầy đủ'
      },
      {
        stepNumber: 2,
        title: 'Đối chiếu GPLX trực tuyến',
        description: 'Tra cứu hệ thống Cục Đường bộ về tính hợp lệ, thời hạn, điểm bằng lái; so khớp hạng với loại xe khai thác.',
        assignedRole: 'AT',
        sla: 'Ngày 1',
        slaHours: 8,
        outputName: 'Kết quả đối chiếu'
      },
      {
        stepNumber: 3,
        title: 'Xác minh lịch sử an toàn',
        description: 'Xác minh vi phạm giao thông quá khứ, tiền sử va chạm tại các đơn vị vận tải trước.',
        assignedRole: 'AT',
        sla: '1 đến 2 ngày',
        slaHours: 16,
        outputName: 'Báo cáo xác minh'
      },
      {
        stepNumber: 4,
        title: 'Kiểm tra lý thuyết an toàn giao thông',
        description: 'Bộ đề trắc nghiệm quy tắc giao thông, quy trình phòng ngừa rủi ro. Yêu cầu đạt từ 80/100 điểm.',
        assignedRole: 'AT',
        sla: 'Ngày 2',
        slaHours: 8,
        outputName: 'Điểm lý thuyết'
      },
      {
        stepNumber: 5,
        title: 'Kiểm tra nhanh nồng độ cồn và ma túy',
        description: 'Test nhanh cồn qua hơi thở và que thử ma túy đa chất (có thông báo và sự đồng ý của ứng viên theo SOP-16).',
        assignedRole: 'AT',
        sla: 'Ngày 2',
        slaHours: 4,
        outputName: 'Biên bản kiểm tra'
      },
      {
        stepNumber: 6,
        title: 'Lái thử thực hành trên đường thực tế',
        description: 'Tối thiểu 45 phút trên xe thật: kiểm tra xe trước hành trình, khởi hành, lùi, đỗ, vào cua, lái xe phòng thủ.',
        assignedRole: 'AT',
        sla: 'Ngày 2 đến 3',
        slaHours: 16,
        outputName: 'Phiếu HR-F03',
        outputFormCode: 'HR-F03'
      },
      {
        stepNumber: 7,
        title: 'Đánh giá tổng hợp và phê duyệt phân xe',
        description: 'Kết luận: Đạt, Đạt có điều kiện (bổ túc thêm), hoặc Không đạt. Điều độ và An toàn ký xác nhận.',
        assignedRole: 'ĐĐ',
        sla: 'Ngày 3',
        slaHours: 8,
        outputName: 'HR-F03 đã ký',
        isDecision: true,
        decisionCondition: 'Đạt kiểm tra thực hành & lý thuyết?'
      },
      {
        stepNumber: 8,
        title: 'Chuyển hồ sơ sang Onboarding',
        description: 'Lưu trữ hồ sơ sát hạch, tạo mã hồ sơ điện tử và chuyển sang SOP-03 Tiếp nhận.',
        assignedRole: 'HR',
        sla: 'Ngày 3',
        slaHours: 8,
        outputName: 'Hồ sơ tài xế'
      }
    ],
    legalFramework: [
      'Luật Trật tự, an toàn giao thông đường bộ 2024.',
      'Nghị định 168/2024/NĐ-CP về trách nhiệm kiểm tra sức khỏe và giấy phép lái xe.',
      'SOP-16: Bảo mật dữ liệu cá nhân nhạy cảm khi test cồn/ma túy.'
    ],
    relatedForms: ['HR-F03'],
    kpis: [
      { indicator: 'Tỷ lệ đạt kiểm tra đầu vào', target: '35% - 60%' },
      { indicator: 'Thời gian hoàn tất kiểm tra', target: '≤ 3 ngày làm việc' },
      { indicator: 'Tai nạn tài xế mới 6 tháng đầu', target: '0 vụ nghiêm trọng' }
    ]
  },
  {
    code: 'HR-SOP-03',
    title: 'Tiếp nhận (onboarding), thử việc và ký hợp đồng',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Giúp nhân sự mới hòa nhập nhanh, làm việc an toàn ngay từ đầu, và có cơ sở đánh giá khách quan để quyết định ký hợp đồng chính thức.',
    scope: 'Mọi nhân sự mới khối văn phòng và khối tài xế.',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'R', dd: 'C', at: 'C', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Chuẩn bị trước ngày nhận việc',
        description: 'Văn phòng: chỗ ngồi, laptop, email, tài khoản. Tài xế: tài khoản app điều độ, đồng phục, thiết bị định vị, ghép xe chạy kèm.',
        assignedRole: 'HR',
        sla: '3 ngày trước nhận việc',
        slaHours: 24,
        outputName: 'Checklist chuẩn bị'
      },
      {
        stepNumber: 2,
        title: 'Ngày 1: Đón tiếp và ký hợp đồng thử việc',
        description: 'Giới thiệu nội quy, ký HĐ thử việc, cam kết an toàn & bảo mật (SOP-16), thu nộp đủ hồ sơ gốc đối chiếu.',
        assignedRole: 'HR',
        sla: 'Ngày 1',
        slaHours: 8,
        outputName: 'Hợp đồng thử việc, hồ sơ'
      },
      {
        stepNumber: 3,
        title: 'Chương trình đào tạo hội nhập',
        description: 'Văn phòng: định hướng 30-60-90 ngày. Tài xế: 2-3 ngày học an toàn, quy trình giao nhận, sau đó chạy kèm mentor 3-5 chuyến.',
        assignedRole: 'AT',
        sla: 'Tuần 1 đến 2',
        slaDays: 14,
        outputName: 'Checklist HR-F05 / HR-F06',
        outputFormCode: 'HR-F06'
      },
      {
        stepNumber: 4,
        title: 'Theo dõi tiến độ & phản hồi 1-1',
        description: 'Họp 1-1 tuần 1, tuần 4 và giữa kỳ. Tài xế: phân tích dữ liệu GPS/camera và chất lượng chuyến giao nhận.',
        assignedRole: 'QL',
        sla: 'Trong thời gian thử việc',
        slaDays: 30,
        outputName: 'Ghi chú phản hồi'
      },
      {
        stepNumber: 5,
        title: 'Lập phiếu đánh giá thử việc',
        description: 'Đánh giá 5 tiêu chí: Hoàn thành mục tiêu (35%), Kỹ năng (20%), Tuân thủ an toàn (20%), Thái độ (15%), Chuyên cần (10%).',
        assignedRole: 'QL',
        sla: 'Trước khi hết thử việc 5 ngày',
        slaDays: 5,
        outputName: 'Phiếu HR-F07',
        outputFormCode: 'HR-F07',
        isDecision: true,
        decisionCondition: 'Đạt yêu cầu thử việc?'
      },
      {
        stepNumber: 6,
        title: 'Ra quyết định ký HĐLĐ chính thức',
        description: 'Nếu đạt: ký hợp đồng lao động chính thức; nếu không đạt: thông báo chấm dứt thử việc trước hạn theo luật.',
        assignedRole: 'HR',
        sla: 'Trước khi hết thử việc',
        slaHours: 24,
        outputName: 'HĐLĐ hoặc thông báo'
      },
      {
        stepNumber: 7,
        title: 'Đăng ký BHXH & hoàn tất onboarding',
        description: 'Báo tăng lao động BHXH (SOP-08), đăng ký mã số thuế cá nhân người phụ thuộc.',
        assignedRole: 'HR',
        sla: 'Theo thời hạn luật',
        slaDays: 30,
        outputName: 'Hồ sơ BHXH'
      }
    ],
    legalFramework: [
      'Điều 25 Bộ luật Lao động 2019: Thời gian thử việc (60 ngày ĐH/CĐ, 30 ngày TC/NV nghiệp vụ, 6 ngày lao động khác).',
      'Điều 26: Lương thử việc ít nhất 85% mức lương chính thức.',
      'Tài xế chỉ được lái độc lập sau khi hoàn thành chạy kèm 3-5 chuyến và được An toàn phê duyệt.'
    ],
    relatedForms: ['HR-F05', 'HR-F06', 'HR-F07'],
    kpis: [
      { indicator: 'Tỷ lệ hoàn thành checklist onboarding đúng hạn', target: '≥ 95%' },
      { indicator: 'Điểm hài lòng nhân sự mới ngày 30', target: '≥ 4.0/5' },
      { indicator: 'Nghỉ việc trong thử việc (tài xế)', target: '≤ 20%' }
    ]
  },
  {
    code: 'HR-SOP-04',
    title: 'Hợp đồng lao động và quản lý hồ sơ nhân sự',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự (hồ sơ)',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Bảo đảm mọi quan hệ lao động được xác lập đúng luật, hồ sơ đầy đủ, dễ truy xuất, và các giấy tờ có thời hạn của tài xế (GPLX, sức khỏe, chứng chỉ) luôn còn hiệu lực.',
    scope: 'Toàn bộ 500 nhân sự từ khi nhận việc đến khi lưu trữ sau nghỉ việc.',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'I', dd: 'C', at: 'I', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Lập hồ sơ theo danh mục chuẩn',
        description: 'CCCD, sơ yếu lý lịch, bằng cấp, giấy khám sức khỏe tài xế, hợp đồng, quyết định. Tài xế: GPLX, chứng chỉ an toàn, giấy tờ xe giao.',
        assignedRole: 'HR',
        sla: 'Ngày 1 đến 3',
        slaHours: 24,
        outputName: 'Hồ sơ gốc'
      },
      {
        stepNumber: 2,
        title: 'Soạn và ký kết hợp đồng lao động',
        description: 'HĐ xác định hoặc không xác định thời hạn. Phụ lục khi có biến động ca, tuyến, công việc.',
        assignedRole: 'BGĐ',
        sla: 'Trước khi bắt đầu làm việc',
        slaHours: 8,
        outputName: 'HĐLĐ đã ký'
      },
      {
        stepNumber: 3,
        title: 'Nhập dữ liệu vào hệ thống HRIS',
        description: 'Số hóa văn bản, phân quyền bảo mật xem/sửa hồ sơ nhân viên và tài xế.',
        assignedRole: 'HR',
        sla: '3 ngày',
        slaHours: 24,
        outputName: 'Hồ sơ số hóa'
      },
      {
        stepNumber: 4,
        title: 'Thiết lập cảnh báo tự động hạn giấy tờ',
        description: 'Hệ thống tự động quét cảnh báo trước 60 ngày: GPLX, Giấy khám SK, HĐLĐ. Tài xế hết hạn giấy tờ bị TỰ ĐỘNG KHÓA ĐIỀU XE!',
        assignedRole: 'HR',
        sla: 'Hằng tuần tự động',
        slaHours: 0,
        outputName: 'Báo cáo sắp hết hạn'
      },
      {
        stepNumber: 5,
        title: 'Cập nhật biến động hồ sơ',
        description: 'Khi đổi chỗ ở, bổ sung bằng lái hạng mới, người phụ thuộc: cập nhật trong 5 ngày làm việc.',
        assignedRole: 'HR',
        sla: '5 ngày',
        slaDays: 5,
        outputName: 'Hồ sơ cập nhật'
      },
      {
        stepNumber: 6,
        title: 'Kiểm kê định kỳ chất lượng hồ sơ',
        description: 'Kiểm tra ngẫu nhiên 10% hồ sơ hàng quý, rà soát thiếu sót chữ ký, thiếu phụ lục.',
        assignedRole: 'HR',
        sla: 'Hằng quý',
        slaDays: 90,
        outputName: 'Biên bản kiểm kê'
      },
      {
        stepNumber: 7,
        title: 'Đóng và lưu trữ hồ sơ sau thôi việc',
        description: 'Lưu trữ theo quy định pháp luật và chính sách bảo mật dữ liệu SOP-16.',
        assignedRole: 'HR',
        sla: 'Theo SOP-15',
        slaDays: 14,
        outputName: 'Hồ sơ lưu trữ'
      }
    ],
    legalFramework: [
      'Điều 17 BLLĐ 2019: Cấm giữ bản chính giấy tờ tùy thân, văn bằng.',
      'Điều 20: Không ký liên tiếp quá 2 lần HĐLĐ xác định thời hạn.',
      'Điều 29: Chuyển làm việc khác không quá 60 ngày cộng dồn/năm nếu không có thỏa thuận văn bản.'
    ],
    relatedForms: ['HR-F04'],
    kpis: [
      { indicator: 'Tỷ lệ hồ sơ đầy đủ danh mục', target: '≥ 98%' },
      { indicator: 'Giấy tờ tài xế hết hạn mà vẫn điều xe', target: '0 trường hợp (Tuyệt đối)' },
      { indicator: 'Ký kết HĐLĐ đúng hạn', target: '100%' }
    ]
  },
  {
    code: 'HR-SOP-05',
    title: 'Chấm công, thời giờ làm việc và làm thêm giờ',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự (C&B)',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Ghi nhận chính xác thời giờ làm việc, bảo đảm tuân thủ giới hạn thời gian lái xe và làm thêm giờ, làm cơ sở tính lương và chứng minh tuân thủ khi thanh tra.',
    scope: 'Khối văn phòng (hành chính) và khối tài xế (theo ca, chuyến, dữ liệu hành trình GPS/camera).',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'R', dd: 'R', at: 'C', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Ghi nhận chấm công hàng ngày',
        description: 'Văn phòng: vân tay/app 8h-17h, nghỉ trưa 60p. Tài xế: tích hợp tự động từ phần mềm điều độ và thiết bị giám sát hành trình.',
        assignedRole: 'HR',
        sla: 'Hằng ngày',
        slaHours: 24,
        outputName: 'Dữ liệu chấm công'
      },
      {
        stepNumber: 2,
        title: 'Giám sát trần giờ lái xe (4h / 10h / 48h)',
        description: 'Hệ thống tự động cảnh báo khi tài xế đạt 3.8h liên tục (trần 4h), 9.5h trong ngày (trần 10h), 46h trong tuần (trần 48h).',
        assignedRole: 'AT',
        sla: 'Liên tục thời gian thực',
        slaMinutes: 15,
        outputName: 'Cảnh báo vi phạm giờ lái',
        isDecision: true,
        decisionCondition: 'Tài xế trong ngưỡng an toàn thời gian lái xe?'
      },
      {
        stepNumber: 3,
        title: 'Đăng ký làm thêm giờ bằng văn bản',
        description: 'Phải có sự đồng ý tự nguyện của người lao động trước khi làm thêm. Kiểm tra ngưỡng 40h/tháng, 200h/năm.',
        assignedRole: 'QL',
        sla: 'Trước khi làm thêm',
        slaHours: 4,
        outputName: 'Phiếu HR-F09',
        outputFormCode: 'HR-F09'
      },
      {
        stepNumber: 4,
        title: 'Phê duyệt phiếu làm thêm giờ',
        description: 'Trưởng bộ phận duyệt. Tuyệt đối không cho phép tài xế làm thêm nếu vi phạm Điều 64 Luật TTATGT 2024.',
        assignedRole: 'BGĐ',
        sla: 'Trước khi làm',
        slaHours: 4,
        outputName: 'HR-F09 đã duyệt'
      },
      {
        stepNumber: 5,
        title: 'Đối soát công với dữ liệu GPS & chuyến',
        description: 'So khớp giữa giờ máy chấm công/điều độ với bảng theo dõi giờ lái HR-F10 và đơn nghỉ phép.',
        assignedRole: 'HR',
        sla: 'Ngày 20-25 hàng tháng',
        slaDays: 5,
        outputName: 'Bảng công nháp'
      },
      {
        stepNumber: 6,
        title: 'Công bố bảng công & tiếp nhận phản hồi',
        description: 'Công khai bảng công trong 2 ngày làm việc để người lao động kiểm tra sai sót và chốt số liệu.',
        assignedRole: 'HR',
        sla: 'Ngày 25 hàng tháng',
        slaDays: 2,
        outputName: 'Bảng công chốt'
      },
      {
        stepNumber: 7,
        title: 'Chuyển dữ liệu sang tính lương SOP-07',
        description: 'Chuyển dữ liệu ngày công, giờ làm thêm 150%, 200%, 300%, làm đêm sang bộ phận C&B.',
        assignedRole: 'HR',
        sla: 'Ngày 26 hàng tháng',
        slaHours: 8,
        outputName: 'Dữ liệu chuyển lương'
      }
    ],
    legalFramework: [
      'Điều 64 Luật Trật tự, ATGT đường bộ 2024: Không lái quá 10h/ngày, 48h/tuần, không lái liên tục quá 4h.',
      'Nghị định 168/2024/NĐ-CP: Phạt nặng chủ phương tiện nếu tài xế vi phạm giờ lái xe.',
      'Điều 107 BLLĐ 2019 & Nghị định 283/2026/NĐ-CP (hiệu lực 10/09/2026): Phạt rất nặng hành vi ép làm thêm giờ khi chưa đồng ý bằng văn bản.'
    ],
    relatedForms: ['HR-F09', 'HR-F10'],
    kpis: [
      { indicator: 'Số vi phạm thời gian lái xe theo GPS', target: '0 vi phạm (Mục tiêu 0)' },
      { indicator: 'Tỷ lệ sai lệch bảng công sau công bố', target: '≤ 1%' },
      { indicator: 'Chốt công đúng hạn', target: '100%' }
    ]
  },
  {
    code: 'HR-SOP-06',
    title: 'Nghỉ phép và các loại nghỉ',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Bảo đảm người lao động được nghỉ đúng quyền lợi, đồng thời có thể chủ động bố trí xe và tài xế thay thế không làm gián đoạn vận chuyển.',
    scope: 'Toàn bộ 500 nhân sự công ty.',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'R', dd: 'C', at: 'I', kt: 'I', bgd: 'I' },
    steps: [
      {
        stepNumber: 1,
        title: 'Nộp đơn xin nghỉ phép',
        description: 'Văn phòng báo trước 3 ngày (nghỉ >=3 ngày báo trước 7 ngày). Tài xế báo trước 5 ngày (nghỉ dài báo 10 ngày) để điều độ bố trí lái thay thế.',
        assignedRole: 'Tài xế',
        sla: 'Theo quy định báo trước',
        slaHours: 24,
        outputName: 'Đơn HR-F08',
        outputFormCode: 'HR-F08'
      },
      {
        stepNumber: 2,
        title: 'Quản lý / Điều độ phê duyệt',
        description: 'Kiểm tra lịch ca xe, năng lực vận chuyển đội xe và phê duyệt đơn.',
        assignedRole: 'QL',
        sla: '2 ngày làm việc',
        slaHours: 16,
        outputName: 'Đơn đã duyệt'
      },
      {
        stepNumber: 3,
        title: 'Kiểm tra quỹ phép & cập nhật hệ thống',
        description: 'HR kiểm tra số dư phép năm còn lại, trừ quỹ phép trên hệ thống.',
        assignedRole: 'HR',
        sla: '1 ngày',
        slaHours: 8,
        outputName: 'Số dư phép cập nhật'
      },
      {
        stepNumber: 4,
        title: 'Xử lý nghỉ đột xuất (ốm đau, sự cố)',
        description: 'Báo Điều độ/Quản lý ngay trước ca; nộp chứng từ y tế hợp lệ trong 3 ngày sau khi đi làm lại.',
        assignedRole: 'Tài xế',
        sla: 'Trước ca chạy',
        slaHours: 2,
        outputName: 'Chứng từ y tế'
      },
      {
        stepNumber: 5,
        title: 'Hồ sơ thanh toán chế độ BHXH',
        description: 'Với nghỉ ốm, thai sản, tai nạn lao động: hướng dẫn hoàn tất hồ sơ gửi cơ quan BHXH.',
        assignedRole: 'HR',
        sla: 'Theo luật',
        slaDays: 10,
        outputName: 'Hồ sơ BHXH'
      },
      {
        stepNumber: 6,
        title: 'Chốt quỹ phép cuối năm',
        description: 'Quyết toán phép tồn theo chính sách công ty (chuyển sang quý I năm sau hoặc thanh toán cho thôi việc).',
        assignedRole: 'HR',
        sla: 'Tháng 12',
        slaDays: 30,
        outputName: 'Báo cáo quỹ phép'
      }
    ],
    legalFramework: [
      'Điều 113 BLLĐ 2019: Phép năm 12 ngày (thường), 14 ngày (nặng nhọc/độc hại/lái xe tải nặng), tăng 1 ngày mỗi 5 năm.',
      'Điều 115: Nghỉ việc riêng có lương (kết hôn 3 ngày, con kết hôn 1 ngày, cha mẹ/vợ chồng/con mất 3 ngày).'
    ],
    relatedForms: ['HR-F08'],
    kpis: [
      { indicator: 'Tỷ lệ nghỉ đột xuất không báo trước', target: '≤ 2%' },
      { indicator: 'Xử lý đơn nghỉ trong 2 ngày', target: '≥ 95%' },
      { indicator: 'Số dư phép tồn bình quân cuối năm', target: '≤ 3 ngày/người' }
    ]
  },
  {
    code: 'HR-SOP-07',
    title: 'Tiền lương, thưởng và phúc lợi',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự (C&B) phối hợp Kế toán',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Tính và chi trả lương chính xác, đúng hạn, minh bạch, bảo đảm tuân thủ pháp luật và tạo động lực an toàn, đúng giờ.',
    scope: 'Toàn bộ 500 nhân sự; kỳ lương tháng, tạm ứng chuyến xe đường dài, thưởng và phúc lợi.',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'C', dd: 'C', at: 'C', kt: 'R', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Chốt bảng công và ngày công làm thêm',
        description: 'Tiếp nhận bảng công chuẩn hóa từ SOP-05 và SOP-06.',
        assignedRole: 'HR',
        sla: 'Ngày 25 hàng tháng',
        slaHours: 8,
        outputName: 'Bảng công chốt'
      },
      {
        stepNumber: 2,
        title: 'Tổng hợp dữ liệu chuyến xe & phụ cấp',
        description: 'Số km, tấn hàng, chuyến chạy, phụ cấp ăn ca, lưu đêm, thưởng an toàn, dữ liệu phạt nguội hoặc khấu trừ hợp lệ.',
        assignedRole: 'ĐĐ',
        sla: 'Ngày 26 hàng tháng',
        slaHours: 8,
        outputName: 'Dữ liệu tính lương'
      },
      {
        stepNumber: 3,
        title: 'Tính bảng lương nháp chi tiết',
        description: 'Tính lương cơ bản (≥ lương tối thiểu vùng) + lương chuyến + thưởng + thêm giờ - trích BHXH, thuế TNCN, khấu trừ ≤ 30%.',
        assignedRole: 'HR',
        sla: 'Ngày 26 đến 27',
        slaHours: 16,
        outputName: 'Bảng lương nháp'
      },
      {
        stepNumber: 4,
        title: 'Đối soát chéo dữ liệu và biến động',
        description: 'C&B và Trưởng phòng Nhân sự rà soát biến động lương trên 10% so với tháng trước.',
        assignedRole: 'HR',
        sla: 'Ngày 27 hàng tháng',
        slaHours: 8,
        outputName: 'Biên bản đối soát'
      },
      {
        stepNumber: 5,
        title: 'Phê duyệt bảng lương',
        description: 'Kế toán trưởng kiểm soát quỹ chi trả, Giám đốc ký duyệt chính thức.',
        assignedRole: 'BGĐ',
        sla: 'Ngày 28 hàng tháng',
        slaHours: 8,
        outputName: 'Bảng lương duyệt'
      },
      {
        stepNumber: 6,
        title: 'Chi trả lương & gửi phiếu lương mật',
        description: 'Chuyển khoản ngân hàng đúng hạn ngày mùng 5 hàng tháng; tự động gửi phiếu lương điện tử bảo mật đến từng cá nhân.',
        assignedRole: 'KT',
        sla: 'Ngày 5 tháng sau',
        slaHours: 8,
        outputName: 'Ủy nhiệm chi, phiếu lương'
      },
      {
        stepNumber: 7,
        title: 'Tạm ứng và quyết toán chuyến dài',
        description: 'Cấp tạm ứng chi phí đường sá, xăng dầu; quyết toán trong 3 ngày sau khi chuyến hoàn thành.',
        assignedRole: 'KT',
        sla: 'Theo từng chuyến',
        slaDays: 3,
        outputName: 'Phiếu quyết toán'
      },
      {
        stepNumber: 8,
        title: 'Giải quyết khiếu nại thắc mắc lương',
        description: 'Tiếp nhận phản hồi và xử lý giải trình cho người lao động trong tối đa 5 ngày làm việc.',
        assignedRole: 'HR',
        sla: '5 ngày làm việc',
        slaDays: 5,
        outputName: 'Văn bản phản hồi'
      }
    ],
    legalFramework: [
      'Điều 94, 97 BLLĐ 2019: Trả lương trực tiếp, đầy đủ, đúng hạn. Chậm trả từ 15 ngày phải chịu lãi.',
      'Nghị định 283/2026/NĐ-CP (10/09/2026): Tăng mức xử phạt hành chính đối với chậm trả lương.',
      'Điều 102: Khấu trừ tiền lương mỗi tháng không quá 30% tiền lương thực trả sau thuế và BHXH.',
      'Nghiêm cấm phạt tiền, trừ lương thay cho kỷ luật lao động.'
    ],
    relatedForms: [],
    kpis: [
      { indicator: 'Trả lương đúng hạn mùng 5', target: '100% (Tuyệt đối)' },
      { indicator: 'Tỷ lệ sai sót bảng lương', target: '≤ 0.5%' },
      { indicator: 'Khiếu nại lương giải quyết trong 5 ngày', target: '≥ 95%' }
    ]
  },
  {
    code: 'HR-SOP-08',
    title: 'Bảo hiểm xã hội, y tế, thất nghiệp và thuế TNCN',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự (BHXH)',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Bảo đảm đóng và giải quyết chế độ bảo hiểm, thuế TNCN đầy đủ, đúng hạn cho toàn bộ người lao động.',
    scope: '500 nhân sự và người phụ thuộc.',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'I', dd: 'I', at: 'I', kt: 'R', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Đăng ký tăng lao động mới',
        description: 'Báo tăng đóng BHXH, BHYT, BHTN trong vòng 30 ngày kể từ khi HĐLĐ có hiệu lực; cấp mã thẻ BHYT.',
        assignedRole: 'HR',
        sla: 'Trong 30 ngày',
        slaDays: 30,
        outputName: 'Hồ sơ báo tăng'
      },
      {
        stepNumber: 2,
        title: 'Điều chỉnh chức danh và mức đóng',
        description: 'Cập nhật kịp thời khi có thay đổi lương hoặc chuyển đổi luồng văn phòng / tài xế.',
        assignedRole: 'HR',
        sla: 'Theo hạn luật',
        slaDays: 10,
        outputName: 'Hồ sơ điều chỉnh'
      },
      {
        stepNumber: 3,
        title: 'Đóng tiền BHXH hàng tháng',
        description: 'Lập bảng đối chiếu C12 với cơ quan BHXH, chuyển tiền đóng đúng hạn tháng.',
        assignedRole: 'KT',
        sla: 'Hằng tháng',
        slaDays: 30,
        outputName: 'Chứng từ nộp tiền'
      },
      {
        stepNumber: 4,
        title: 'Giải quyết chế độ thai sản, ốm đau, TNLĐ',
        description: 'Nộp hồ sơ điện tử qua cổng BHXH và chi trả quyền lợi cho người lao động.',
        assignedRole: 'HR',
        sla: 'Theo quy định BHXH',
        slaDays: 10,
        outputName: 'Hồ sơ chế độ'
      },
      {
        stepNumber: 5,
        title: 'Báo giảm lao động và chốt sổ BHXH',
        description: 'Thực hiện ngay khi người lao động chấm dứt hợp đồng, trả sổ BHXH trong hạn quy định.',
        assignedRole: 'HR',
        sla: 'Theo hạn luật (SOP-15)',
        slaDays: 14,
        outputName: 'Sổ BHXH đã chốt'
      },
      {
        stepNumber: 6,
        title: 'Kê khai thuế TNCN và người phụ thuộc',
        description: 'Đăng ký MST, giảm trừ gia cảnh, khấu trừ hàng tháng và quyết toán thuế năm.',
        assignedRole: 'KT',
        sla: 'Hằng tháng / Quyết toán năm',
        slaDays: 30,
        outputName: 'Tờ khai thuế'
      }
    ],
    legalFramework: [
      'Luật Bảo hiểm xã hội 2024 và các hướng dẫn thi hành.',
      'Luật Thuế thu nhập cá nhân hiện hành.',
      'Thu nhập tài xế theo chuyến/km phải đưa vào diện xác định mức đóng theo hướng dẫn của BHXH.'
    ],
    relatedForms: [],
    kpis: [
      { indicator: 'Đăng ký tăng BHXH đúng hạn', target: '100%' },
      { indicator: 'Nộp tiền BHXH đúng hạn không để nợ lãi', target: '100%' },
      { indicator: 'Hồ sơ chế độ ốm đau/thai sản giải quyết đúng hạn', target: '≥ 98%' }
    ]
  },
  {
    code: 'HR-SOP-09',
    title: 'Đào tạo và phát triển',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự (đào tạo)',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Nâng cao an toàn, chất lượng dịch vụ và năng lực quản lý; xây dựng lộ trình nghề nghiệp giúp giữ chân nhân sự vận tải.',
    scope: 'Toàn bộ 500 nhân sự; bắt buộc đối với toàn bộ 400 tài xế về an toàn giao thông.',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'C', dd: 'I', at: 'R', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Xác định nhu cầu đào tạo từ dữ liệu',
        description: 'Tổng hợp từ kết quả đánh giá KPI, dữ liệu vi phạm camera/GPS, sự cố tai nạn và thay đổi luật.',
        assignedRole: 'HR',
        sla: 'Quý III - IV',
        slaDays: 60,
        outputName: 'Bảng nhu cầu'
      },
      {
        stepNumber: 2,
        title: 'Lập kế hoạch & ngân sách đào tạo năm',
        description: 'Kế hoạch khóa huấn luyện định kỳ 6 tháng/lần cho 400 tài xế (lái xe phòng thủ, xử lý ngủ gật, PCCC).',
        assignedRole: 'HR',
        sla: 'Tháng 12',
        slaDays: 30,
        outputName: 'Kế hoạch năm'
      },
      {
        stepNumber: 3,
        title: 'Tổ chức các khóa học chuyên đề',
        description: 'Huấn luyện tại bãi xe theo ca ngắn hoặc qua ứng dụng di động để không ảnh hưởng thời gian nghỉ bắt buộc.',
        assignedRole: 'AT',
        sla: 'Theo tiến độ kế hoạch',
        slaDays: 7,
        outputName: 'Danh sách tham dự'
      },
      {
        stepNumber: 4,
        title: 'Kiểm tra & đánh giá sau đào tạo',
        description: 'Đánh giá tỷ lệ giảm vi phạm tốc độ/phanh gấp sau 30-90 ngày theo dõi camera.',
        assignedRole: 'AT',
        sla: 'Sau khóa học',
        slaDays: 30,
        outputName: 'Báo cáo hiệu quả'
      },
      {
        stepNumber: 5,
        title: 'Kèm cặp 1-1 cho tài xế vi phạm',
        description: 'Tài xế có cảnh báo vi phạm liên tiếp được phân công Đội trưởng hoặc Huấn luyện viên kèm cặp thực tế.',
        assignedRole: 'QL',
        sla: 'Sau vi phạm',
        slaDays: 7,
        outputName: 'Biên bản kèm cặp'
      }
    ],
    legalFramework: [
      'Luật An toàn, vệ sinh lao động 2015: Huấn luyện ATVSLĐ định kỳ bắt buộc.',
      'Điều 62 BLLĐ: Cam kết đào tạo chi phí lớn và hoàn trả chi phí khi vi phạm thời gian phục vụ.'
    ],
    relatedForms: [],
    kpis: [
      { indicator: 'Tỷ lệ tài xế hoàn thành đào tạo an toàn bắt buộc', target: '100% (Tuyệt đối)' },
      { indicator: 'Giờ đào tạo bình quân tài xế/năm', target: '≥ 16 giờ' },
      { indicator: 'Giảm tỷ lệ vi phạm an toàn sau đào tạo', target: '≥ 20%' }
    ]
  },
  {
    code: 'HR-SOP-10',
    title: 'Đánh giá hiệu suất',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Đánh giá công bằng dựa trên dữ liệu, làm cơ sở cho thưởng, tăng lương, đào tạo và thăng tiến.',
    scope: 'Khối văn phòng đánh giá theo quý và năm; khối tài xế đánh giá theo tháng, tổng kết quý.',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'R', dd: 'C', at: 'C', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Thiết lập mục tiêu và tiêu chí trọng số',
        description: 'Tài xế 6 tiêu chí: An toàn (30%), Đúng giờ chuyến (20%), Nhiên liệu (15%), Hàng hóa dịch vụ (15%), Tuân thủ quy trình (10%), Chuyên cần thái độ (10%). Văn phòng: KPI 70% + Giá trị cốt lõi 30%.',
        assignedRole: 'HR',
        sla: 'Đầu kỳ',
        slaDays: 5,
        outputName: 'Khung mục tiêu'
      },
      {
        stepNumber: 2,
        title: 'Thu thập dữ liệu tự động từ hệ thống',
        description: 'Trích xuất dữ liệu GPS, camera an toàn, phản hồi khách hàng, chấm công, phiếu kiểm tra xe.',
        assignedRole: 'AT',
        sla: 'Cuối kỳ',
        slaDays: 2,
        outputName: 'Dữ liệu đo lường'
      },
      {
        stepNumber: 3,
        title: 'Chấm điểm và lập phiếu đánh giá',
        description: 'Quản lý trực tiếp chấm điểm trên phiếu HR-F17 (tài xế) hoặc HR-F18 (văn phòng). Phân loại A, B, C, D.',
        assignedRole: 'QL',
        sla: '5 ngày làm việc',
        slaDays: 5,
        outputName: 'Phiếu HR-F17 / HR-F18',
        outputFormCode: 'HR-F17'
      },
      {
        stepNumber: 4,
        title: 'Hiệu chuẩn kết quả toàn công ty',
        description: 'HR chủ trì rà soát phân bổ điểm giữa các đội xe và phòng ban, bảo đảm tính khách quan.',
        assignedRole: 'HR',
        sla: '3 ngày làm việc',
        slaDays: 3,
        outputName: 'Báo cáo hiệu chuẩn'
      },
      {
        stepNumber: 5,
        title: 'Họp phản hồi 1-1 với nhân viên',
        description: 'Trao đổi kết quả, lắng nghe phản hồi và lập kế hoạch khắc phục với nhân sự xếp loại C, D.',
        assignedRole: 'QL',
        sla: '5 ngày làm việc',
        slaDays: 5,
        outputName: 'Kế hoạch cải thiện'
      },
      {
        stepNumber: 6,
        title: 'Ứng dụng kết quả đánh giá',
        description: 'Chi trả thưởng an toàn/hiệu suất tháng, xét tăng lương, bổ nhiệm hoặc xử lý hiệu suất kém.',
        assignedRole: 'BGĐ',
        sla: 'Sau kỳ đánh giá',
        slaDays: 5,
        outputName: 'Quyết định khen thưởng / xử lý'
      }
    ],
    legalFramework: [
      'Quy chế đánh giá hiệu suất phải công khai minh bạch.',
      'Xếp loại: A (≥90 điểm), B (80 đến <90), C (65 đến <80), D (<65 điểm).'
    ],
    relatedForms: ['HR-F17', 'HR-F18'],
    kpis: [
      { indicator: 'Tỷ lệ hoàn thành đánh giá đúng hạn', target: '≥ 95%' },
      { indicator: 'Tỷ lệ nhân sự được phản hồi 1-1', target: '100%' },
      { indicator: 'Độ tin cậy dữ liệu tài xế tự động', target: '≥ 90% lấy từ hệ thống' }
    ]
  },
  {
    code: 'HR-SOP-11',
    title: 'An toàn, sức khỏe lao động và quản lý mệt mỏi của tài xế',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Bộ phận An toàn phối hợp Phòng Nhân sự',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Bảo vệ tính mạng người lao động và cộng đồng bằng cách kiểm soát cồn, ma túy, mệt mỏi, giấy tờ, tình trạng xe và hành vi lái xe.',
    scope: 'Toàn bộ 400 tài xế và quy chuẩn an toàn cho toàn thể công ty.',
    targetAudience: 'Khối tài xế',
    raci: { hr: 'C', ql: 'C', dd: 'R', at: 'R', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Kiểm tra trước ca chạy (Pre-trip Check)',
        description: 'Kiểm tra GPLX còn hạn, đo nồng độ cồn trước ca, tự khai báo sức khỏe mệt mỏi, kiểm tra lốp phanh đèn xe.',
        assignedRole: 'AT',
        sla: 'Trước mỗi ca chạy',
        slaMinutes: 15,
        outputName: 'Sổ kiểm tra trước ca',
        isDecision: true,
        decisionCondition: 'Đạt kiểm tra cồn, giấy tờ và xe?'
      },
      {
        stepNumber: 2,
        title: 'Kiểm tra đột xuất cồn và ma túy',
        description: 'Tổ chức kiểm tra ngẫu nhiên tại bãi xe hoặc dọc tuyến tối thiểu 10% lượt/tháng.',
        assignedRole: 'AT',
        sla: 'Hằng tháng',
        slaDays: 30,
        outputName: 'Biên bản kiểm tra đột xuất'
      },
      {
        stepNumber: 3,
        title: 'Giám sát hành trình & camera AI mệt mỏi',
        description: 'Camera nhận diện ngủ gật, cúi nhìn điện thoại, lấn làn, vượt tốc độ. Hệ thống cảnh báo tự động trong vòng 24 giờ.',
        assignedRole: 'AT',
        sla: 'Liên tục, xử lý trong 24 giờ',
        slaHours: 24,
        outputName: 'Báo cáo hành vi vi phạm'
      },
      {
        stepNumber: 4,
        title: 'Quản lý mệt mỏi và xếp ca nghỉ ngơi',
        description: 'Điều độ xếp ca tuân thủ giới hạn 4h liên tục, 10h/ngày, 48h/tuần. Tuyệt đối không xếp chạy ca đêm liên tiếp quá hạn quy định.',
        assignedRole: 'ĐĐ',
        sla: 'Hằng ngày',
        slaHours: 8,
        outputName: 'Lịch phân ca'
      },
      {
        stepNumber: 5,
        title: 'Khám sức khỏe định kỳ người lái xe',
        description: 'Khám chuyên khoa người lái xe định kỳ hàng năm và 6 tháng/lần với môi trường nặng nhọc độc hại.',
        assignedRole: 'HR',
        sla: 'Hằng năm',
        slaDays: 30,
        outputName: 'Hồ sơ sức khỏe'
      },
      {
        stepNumber: 6,
        title: 'Chương trình hỗ trợ phục hồi tài xế',
        description: 'Tư vấn tâm lý sau va chạm, tạo điều kiện luân chuyển công việc nhẹ tạm thời nếu sức khỏe suy giảm.',
        assignedRole: 'HR',
        sla: 'Khi phát sinh',
        slaDays: 7,
        outputName: 'Hồ sơ hỗ trợ'
      }
    ],
    legalFramework: [
      'Chính sách KHÔNG DUNG THỨ với cồn và ma túy (Luật Trật tự ATGT đường bộ 2024).',
      'Điều 6 Luật ATVSLĐ: Người lao động có quyền dừng làm việc nếu có nguy cơ rõ ràng đe dọa tính mạng sức khỏe (tài xế được quyền táp lề nghỉ khi buồn ngủ mệt mỏi và báo Điều độ).'
    ],
    relatedForms: ['HR-F10'],
    kpis: [
      { indicator: 'Vi phạm nồng độ cồn / ma túy', target: '0 trường hợp (Tuyệt đối)' },
      { indicator: 'Tài xế có giấy khám sức khỏe còn hạn', target: '100%' },
      { indicator: 'Tỷ lệ cảnh báo ngủ gật xử lý trong 24 giờ', target: '≥ 95%' }
    ]
  },
  {
    code: 'HR-SOP-12',
    title: 'Xử lý tai nạn và sự cố giao thông (phần nhân sự)',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Bộ phận An toàn phối hợp Phòng Nhân sự',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Bảo đảm phản ứng nhanh, giảm thiệt hại về người, tài sản và uy tín; đối xử công bằng, đúng luật với tài xế liên quan.',
    scope: 'Mọi tai nạn, va chạm, sự cố khi xe công ty đang hoạt động.',
    targetAudience: 'Khối tài xế',
    raci: { hr: 'R', ql: 'C', dd: 'R', at: 'R', kt: 'C', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Tài xế xử lý hiện trường khẩn cấp',
        description: 'Dừng xe, bật đèn khẩn cấp, đặt tam giác cảnh báo, sơ cứu nạn nhân, gọi 115/113 nếu cần. Giữ nguyên hiện trường.',
        assignedRole: 'Tài xế',
        sla: 'Ngay lập tức',
        slaMinutes: 1,
        outputName: 'Ghi nhận thời điểm hiện trường'
      },
      {
        stepNumber: 2,
        title: 'Báo cáo ngay cho Điều độ trực 24/7',
        description: 'Gọi điện/báo app trong vòng ≤ 5 phút: vị trí chính xác, thương vong, tình trạng xe và hàng hóa.',
        assignedRole: 'Tài xế',
        sla: '≤ 5 phút',
        slaMinutes: 5,
        outputName: 'Nhật ký sự cố tiếp nhận'
      },
      {
        stepNumber: 3,
        title: 'Điều độ kích hoạt đội ứng phó khẩn cấp',
        description: 'Trong ≤ 15 phút: thông báo An toàn, HR, Bảo hiểm, Cứu hộ giao thông; bảo toàn tức thời dữ liệu GPS/camera.',
        assignedRole: 'ĐĐ',
        sla: '≤ 15 phút',
        slaMinutes: 15,
        outputName: 'Biên bản tiếp nhận sự cố'
      },
      {
        stepNumber: 4,
        title: 'Hỗ trợ y tế & khai báo tai nạn lao động',
        description: 'HR và An toàn hỗ trợ viện phí, thông báo người nhà, cử người túc trực trong vòng 24 giờ. Lập hồ sơ TNLĐ nếu có thương vong.',
        assignedRole: 'HR',
        sla: 'Trong 24 giờ',
        slaHours: 24,
        outputName: 'Hồ sơ hỗ trợ & TNLĐ'
      },
      {
        stepNumber: 5,
        title: 'Điều tra nguyên nhân tai nạn',
        description: 'Tổ điều tra trích xuất camera hành trình, GPS tốc độ, khám nghiệm xe, biên bản CSGT. Lập biên bản HR-F13.',
        assignedRole: 'AT',
        sla: '7 ngày làm việc',
        slaDays: 7,
        outputName: 'Biên bản HR-F13',
        outputFormCode: 'HR-F13'
      },
      {
        stepNumber: 6,
        title: 'Kết luận mức độ trách nhiệm',
        description: 'Xác định: Không có lỗi, Lỗi một phần, Lỗi hoàn toàn hoặc Cố ý vi phạm. Đề xuất phương án bồi thường bảo hiểm.',
        assignedRole: 'AT',
        sla: '3 ngày làm việc',
        slaDays: 3,
        outputName: 'Kết luận điều tra'
      },
      {
        stepNumber: 7,
        title: 'Xử lý bồi thường & kỷ luật (nếu có)',
        description: 'Căn cứ kết luận để yêu cầu bồi thường theo đúng Điều 129 BLLĐ (không phạt quá 30% lương/tháng) hoặc chuyển SOP-13.',
        assignedRole: 'HR',
        sla: 'Theo SOP-13',
        slaDays: 15,
        outputName: 'Quyết định xử lý'
      },
      {
        stepNumber: 8,
        title: 'Hỗ trợ tâm lý & bài học kinh nghiệm',
        description: 'Tổ chức họp rút kinh nghiệm toàn đội xe, huấn luyện bổ sung quy trình lái xe an toàn.',
        assignedRole: 'HR',
        sla: '30 ngày',
        slaDays: 30,
        outputName: 'Báo cáo bài học'
      }
    ],
    legalFramework: [
      'Điều 145-147 BLLĐ 2019 & Luật ATVSLĐ: Chi trả chi phí y tế và tiền lương trong thời gian điều trị tai nạn lao động.',
      'Điều 129: Trách nhiệm vật chất phải đúng mức thiệt hại và khấu trừ hợp pháp, không gán toàn bộ thiệt hại rủi ro bất khả kháng cho tài xế.'
    ],
    relatedForms: ['HR-F13'],
    kpis: [
      { indicator: 'Thời gian tài xế báo Điều độ sau sự cố', target: '≤ 5 phút' },
      { indicator: 'Thời gian Điều độ kích hoạt đội ứng cứu', target: '≤ 15 phút' },
      { indicator: 'Hỗ trợ tài xế/gia đình y tế', target: '100% trong 24 giờ' },
      { indicator: 'Hoàn tất điều tra đúng hạn', target: '≥ 95%' }
    ]
  },
  {
    code: 'HR-SOP-13',
    title: 'Kỷ luật lao động và trách nhiệm vật chất',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự (quan hệ lao động)',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Xử lý vi phạm công bằng, đúng trình tự pháp luật, hạn chế tranh chấp lao động và tránh quyết định bị tuyên vô hiệu.',
    scope: 'Mọi vi phạm nội quy lao động (an toàn giao thông, cồn ma túy, vận hành, gian lận cước, thái độ).',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'R', dd: 'C', at: 'C', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Lập biên bản ghi nhận vi phạm',
        description: 'Phát hiện hành vi vi phạm, lập biên bản HR-F11 ngay tại thời điểm phát hiện có người chứng kiến.',
        assignedRole: 'QL',
        sla: 'Trong ngày phát hiện',
        slaHours: 8,
        outputName: 'Biên bản HR-F11',
        outputFormCode: 'HR-F11'
      },
      {
        stepNumber: 2,
        title: 'Thu thập chứng cứ kỹ thuật',
        description: 'Trích xuất video camera, dữ liệu GPS, nhật ký đơn hàng, lời khai nhân chứng.',
        assignedRole: 'AT',
        sla: '5 ngày làm việc',
        slaDays: 5,
        outputName: 'Hồ sơ chứng cứ'
      },
      {
        stepNumber: 3,
        title: 'Thẩm định hồ sơ & thời hiệu xử lý',
        description: 'HR kiểm tra hành vi đã được quy định trong Nội quy lao động đăng ký chưa, còn thời hiệu luật định không.',
        assignedRole: 'HR',
        sla: '2 ngày làm việc',
        slaDays: 2,
        outputName: 'Tờ trình xử lý',
        isDecision: true,
        decisionCondition: 'Đủ chứng cứ & còn thời hiệu theo luật?'
      },
      {
        stepNumber: 4,
        title: 'Gửi giấy mời họp xử lý kỷ luật',
        description: 'Gửi thông báo văn bản trước ít nhất 5 ngày làm việc cho người lao động và Công đoàn cơ sở.',
        assignedRole: 'HR',
        sla: 'Trước ít nhất 5 ngày',
        slaDays: 5,
        outputName: 'Thông báo họp'
      },
      {
        stepNumber: 5,
        title: 'Tổ chức phiên họp xử lý kỷ luật',
        description: 'Thành phần: Người sử dụng lao động, người lao động, đại diện BCH Công đoàn. Lập biên bản HR-F12.',
        assignedRole: 'HR',
        sla: 'Theo lịch triệu tập',
        slaHours: 4,
        outputName: 'Biên bản HR-F12',
        outputFormCode: 'HR-F12'
      },
      {
        stepNumber: 6,
        title: 'Ban hành quyết định kỷ luật',
        description: 'Người đại diện theo pháp luật ký quyết định kỷ luật (khiển trách, kéo dài nâng lương, cách chức, sa thải).',
        assignedRole: 'BGĐ',
        sla: 'Trong thời hiệu luật định',
        slaDays: 5,
        outputName: 'Quyết định kỷ luật'
      },
      {
        stepNumber: 7,
        title: 'Thi hành quyết định & xóa kỷ luật',
        description: 'Lưu hồ sơ cá nhân; tự động xóa kỷ luật sau 3 tháng (khiển trách) hoặc 6 tháng theo quy định Điều 126.',
        assignedRole: 'HR',
        sla: 'Sau ban hành',
        slaDays: 90,
        outputName: 'Hồ sơ cập nhật'
      }
    ],
    legalFramework: [
      'Điều 122, 123, 124, 125 BLLĐ 2019: 4 hình thức kỷ luật hợp pháp (Khiển trách, kéo dài nâng lương ≤ 6 tháng, cách chức, sa thải).',
      'Tuyệt đối cấm phạt tiền hoặc trừ lương thay cho kỷ luật lao động.',
      'Gửi thông báo họp trước ít nhất 5 ngày làm việc và bắt buộc có đại diện Công đoàn tham dự.'
    ],
    relatedForms: ['HR-F11', 'HR-F12'],
    kpis: [
      { indicator: 'Quyết định kỷ luật đúng trình tự 100%', target: '100% không bị khiếu nại hủy quyết định' },
      { indicator: 'Thời gian xử lý trung bình', target: '≤ 30 ngày' },
      { indicator: 'Tái phạm sau kỷ luật', target: 'Giảm dần hàng năm' }
    ]
  },
  {
    code: 'HR-SOP-14',
    title: 'Giải quyết khiếu nại và quan hệ lao động',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự (quan hệ lao động)',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Tạo kênh phản ánh minh bạch, an toàn, giải quyết sớm tại cơ sở và ngăn ngừa tranh chấp lao động, đình công.',
    scope: 'Mọi khiếu nại về tiền lương, giờ làm việc, ứng xử quản lý, quấy rối và đối thoại định kỳ.',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'C', dd: 'I', at: 'I', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Tiếp nhận phản ánh qua nhiều kênh',
        description: 'Trực tiếp, hòm thư, email, ứng dụng, quét mã QR bảo mật tại bãi xe (đặc thù khối tài xế). Hỗ trợ ẩn danh.',
        assignedRole: 'HR',
        sla: 'Liên tục 24/7',
        slaHours: 4,
        outputName: 'Phiếu HR-F14',
        outputFormCode: 'HR-F14'
      },
      {
        stepNumber: 2,
        title: 'Ghi nhận và phản hồi xác nhận',
        description: 'Phân loại khiếu nại (lương, giờ lái, quản lý, quấy rối) và gửi xác nhận tiếp nhận trong vòng 1 ngày làm việc.',
        assignedRole: 'HR',
        sla: '1 ngày làm việc',
        slaHours: 8,
        outputName: 'Sổ theo dõi khiếu nại'
      },
      {
        stepNumber: 3,
        title: 'Xác minh và thu thập chứng cứ',
        description: 'Gặp gỡ các bên liên quan, bảo mật danh tính người khiếu nại, đối soát bảng công và camera.',
        assignedRole: 'HR',
        sla: '5 đến 7 ngày làm việc',
        slaDays: 7,
        outputName: 'Báo cáo xác minh'
      },
      {
        stepNumber: 4,
        title: 'Ban hành văn bản trả lời khiếu nại',
        description: 'Đề xuất hướng xử lý và ban hành văn bản giải quyết chính thức trong vòng tối đa 10 ngày làm việc.',
        assignedRole: 'HR',
        sla: '≤ 10 ngày làm việc',
        slaDays: 10,
        outputName: 'Văn bản trả lời chính thức'
      },
      {
        stepNumber: 5,
        title: 'Tổ chức đối thoại tại nơi làm việc',
        description: 'Nếu người lao động chưa đồng thuận: tổ chức phiên đối thoại có sự tham gia của Công đoàn và Ban Giám đốc.',
        assignedRole: 'HR',
        sla: 'Theo yêu cầu',
        slaDays: 5,
        outputName: 'Biên bản đối thoại'
      },
      {
        stepNumber: 6,
        title: 'Đối thoại định kỳ & khảo sát gắn kết',
        description: 'Tổ chức Hội nghị người lao động định kỳ ít nhất 1 lần/năm; khảo sát đo lường mức độ gắn kết eNPS 6 tháng/lần.',
        assignedRole: 'HR',
        sla: 'Định kỳ 6 tháng / năm',
        slaDays: 180,
        outputName: 'Báo cáo gắn kết'
      }
    ],
    legalFramework: [
      'Nghiêm cấm trù dập người khiếu nại tố cáo.',
      'Quy chế dân chủ ở cơ sở tại nơi làm việc và phòng chống quấy rối tình dục theo Điều 84, 85 BLLĐ 2019.'
    ],
    relatedForms: ['HR-F14'],
    kpis: [
      { indicator: 'Tỷ lệ giải quyết khiếu nại trong 10 ngày', target: '≥ 95%' },
      { indicator: 'Tỷ lệ khiếu nại xử lý dứt điểm tại cơ sở', target: '≥ 90%' },
      { indicator: 'Điểm mức độ gắn kết nhân viên', target: '≥ 3.8 / 5' }
    ]
  },
  {
    code: 'HR-SOP-15',
    title: 'Thôi việc, bàn giao và thanh toán',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Chấm dứt quan hệ lao động đúng luật, bàn giao đầy đủ (xe, tài sản, công việc), thanh toán đúng hạn và thu thập thông tin cải tiến giữ chân nhân sự.',
    scope: 'Mọi trường hợp chấm dứt hợp đồng lao động: xin nghỉ, hết hạn, thỏa thuận, sa thải.',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'R', dd: 'I', at: 'I', kt: 'R', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Tiếp nhận đơn xin thôi việc',
        description: 'Kiểm tra thời hạn báo trước theo luật (45 ngày HĐ vô thời hạn, 30 ngày HĐ xác định hạn, 3 ngày thử việc). Lập đơn HR-F15.',
        assignedRole: 'HR',
        sla: '1 ngày làm việc',
        slaHours: 8,
        outputName: 'Đơn HR-F15',
        outputFormCode: 'HR-F15'
      },
      {
        stepNumber: 2,
        title: 'Phỏng vấn thôi việc (Exit Interview)',
        description: 'Tìm hiểu nguyên nhân nghỉ việc, đề xuất giải pháp giữ chân nhân tài nếu phù hợp bằng phiếu HR-F19.',
        assignedRole: 'HR',
        sla: 'Trong 5 ngày',
        slaDays: 5,
        outputName: 'Phiếu HR-F19',
        outputFormCode: 'HR-F19',
        isDecision: true,
        decisionCondition: 'Thương lượng giữ chân thành công?'
      },
      {
        stepNumber: 3,
        title: 'Thực hiện bàn giao xe và tài sản',
        description: 'Văn phòng: dữ liệu, bàn giao công việc. Tài xế: xe tải, kiểm tra tình trạng thân vỏ máy móc, thẻ nhiên liệu, GPS, chìa khóa. Lập HR-F16.',
        assignedRole: 'QL',
        sla: 'Trước ngày làm việc cuối',
        slaDays: 3,
        outputName: 'Biên bản HR-F16',
        outputFormCode: 'HR-F16'
      },
      {
        stepNumber: 4,
        title: 'Thu hồi quyền truy cập hệ thống & app',
        description: 'Khóa tài khoản app điều độ tài xế, email công ty, thẻ ra vào bãi xe đúng ngày làm việc cuối.',
        assignedRole: 'HR',
        sla: 'Ngày cuối cùng',
        slaHours: 4,
        outputName: 'Xác nhận thu hồi quyền'
      },
      {
        stepNumber: 5,
        title: 'Ban hành quyết định thôi việc',
        description: 'Giám đốc ký quyết định chấm dứt hợp đồng lao động chính thức gửi cho nhân viên.',
        assignedRole: 'BGĐ',
        sla: 'Ngày làm việc cuối',
        slaHours: 8,
        outputName: 'Quyết định thôi việc'
      },
      {
        stepNumber: 6,
        title: 'Quyết toán lương và các khoản chế độ',
        description: 'Tính lương ngày làm, phép năm chưa nghỉ, trợ cấp thôi việc (nếu có). Hoàn tất chuyển khoản trong ≤ 14 ngày làm việc.',
        assignedRole: 'KT',
        sla: '≤ 14 ngày làm việc',
        slaDays: 14,
        outputName: 'Bảng thanh toán quyết toán'
      },
      {
        stepNumber: 7,
        title: 'Chốt sổ BHXH và trả hồ sơ',
        description: 'Chốt quá trình đóng BHXH trên hệ thống, bàn giao tờ rời và hướng dẫn thủ tục hưởng bảo hiểm thất nghiệp.',
        assignedRole: 'HR',
        sla: 'Trong thời hạn luật',
        slaDays: 14,
        outputName: 'Sổ BHXH bàn giao'
      },
      {
        stepNumber: 8,
        title: 'Phân tích nguyên nhân & cập nhật báo cáo',
        description: 'Cập nhật cơ sở dữ liệu tỷ lệ nghỉ việc (Turnover rate) để cải tiến chính sách tuyển dụng và đãi ngộ.',
        assignedRole: 'HR',
        sla: '5 ngày sau nghỉ',
        slaDays: 5,
        outputName: 'Báo cáo nguyên nhân nghỉ'
      }
    ],
    legalFramework: [
      'Điều 35, 36, 46, 48 BLLĐ 2019: Thời hạn báo trước và nghĩa vụ thanh toán trong vòng 14 ngày làm việc.',
      'Trợ cấp thôi việc: 1/2 tháng lương mỗi năm làm việc (đối với thời gian không tham gia BHTN).'
    ],
    relatedForms: ['HR-F15', 'HR-F16', 'HR-F19'],
    kpis: [
      { indicator: 'Tỷ lệ thanh toán đúng hạn trong 14 ngày', target: '100% (Tuyệt đối)' },
      { indicator: 'Tỷ lệ hoàn thành bàn giao đầy đủ', target: '≥ 98%' },
      { indicator: 'Tỷ lệ nghỉ việc khối tài xế hàng năm', target: '≤ 25%' },
      { indicator: 'Tỷ lệ nghỉ việc khối văn phòng hàng năm', target: '≤ 12%' }
    ]
  },
  {
    code: 'HR-SOP-16',
    title: 'Bảo mật dữ liệu cá nhân và an toàn thông tin nhân sự',
    version: '1.0 (dự thảo)',
    effectiveDate: '01/01/2025',
    department: 'Phòng Nhân sự phối hợp IT và Pháp chế',
    approvedBy: 'Giám đốc / Tổng giám đốc',
    purpose: 'Bảo vệ dữ liệu cá nhân của 500 người lao động và ứng viên, bao gồm dữ liệu nhạy cảm như sức khỏe, lý lịch tư pháp, định vị GPS, camera, sinh trắc học.',
    scope: 'Toàn bộ dữ liệu hồ sơ nhân sự (văn bản giấy và cơ sở dữ liệu điện tử).',
    targetAudience: 'Cả hai khối',
    raci: { hr: 'R', ql: 'I', dd: 'I', at: 'I', kt: 'I', bgd: 'A' },
    steps: [
      {
        stepNumber: 1,
        title: 'Lập danh mục dữ liệu cá nhân thu thập',
        description: 'Phân loại dữ liệu cơ bản vs nhạy cảm (vị trí GPS thời gian thực, hình ảnh camera cabin, kết quả cồn ma túy, bệnh án).',
        assignedRole: 'HR',
        sla: 'Ban hành & rà soát hàng năm',
        slaDays: 365,
        outputName: 'Sổ danh mục dữ liệu'
      },
      {
        stepNumber: 2,
        title: 'Thu thập văn bản đồng ý xử lý dữ liệu',
        description: 'Lấy văn bản thỏa thuận đồng ý của người lao động trước khi giám sát GPS, camera cabin, lấy vân tay.',
        assignedRole: 'HR',
        sla: 'Khi tiếp nhận nhân sự',
        slaHours: 8,
        outputName: 'Văn bản đồng ý bảo mật'
      },
      {
        stepNumber: 3,
        title: 'Phân quyền truy cập theo vai trò (RBAC)',
        description: 'Áp dụng nguyên tắc tối thiểu cần thiết; chỉ Điều độ & An toàn được xem vị trí xe, chỉ C&B xem bảng lương.',
        assignedRole: 'HR',
        sla: 'Hằng quý rà soát',
        slaDays: 90,
        outputName: 'Ma trận phân quyền'
      },
      {
        stepNumber: 4,
        title: 'Kiểm soát chia sẻ thông tin bên thứ ba',
        description: 'Chỉ chia sẻ cho cơ quan bảo hiểm, thuế, ngân hàng trả lương khi có căn cứ pháp lý hoặc thỏa thuận bảo mật NDA.',
        assignedRole: 'HR',
        sla: 'Khi phát sinh',
        slaDays: 3,
        outputName: 'Hợp đồng bảo mật bên thứ 3'
      },
      {
        stepNumber: 5,
        title: 'Xử lý sự cố lộ lọt thông tin',
        description: 'Khoanh vùng trong vòng 1 giờ, báo cáo cơ quan quản lý và thông báo người lao động bị ảnh hưởng.',
        assignedRole: 'HR',
        sla: 'Ngay khi phát hiện',
        slaHours: 1,
        outputName: 'Biên bản xử lý sự cố an toàn thông tin'
      }
    ],
    legalFramework: [
      'Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.',
      'Không công khai thông tin cá nhân hoặc hình ảnh vi phạm của tài xế ra ngoài công ty nếu chưa được đồng ý.'
    ],
    relatedForms: [],
    kpis: [
      { indicator: 'Số sự cố lộ dữ liệu cá nhân', target: '0 sự cố (Mục tiêu 0)' },
      { indicator: 'Tài khoản có quyền truy cập vượt quá thẩm quyền', target: '0 tài khoản' },
      { indicator: 'Người lao động ký văn bản chấp thuận dữ liệu', target: '100%' }
    ]
  }
];

export const FORM_TEMPLATES: FormTemplate[] = [
  { code: 'HR-F01', title: 'Phiếu đề xuất tuyển dụng', sopCode: 'HR-SOP-01', description: 'Đề xuất định biên, vị trí văn phòng hoặc tài xế, ngân sách lương', category: 'Tuyển dụng' },
  { code: 'HR-F02', title: 'Phiếu đánh giá phỏng vấn', sopCode: 'HR-SOP-01', description: 'Chấm điểm 5 tiêu chí phỏng vấn ứng viên văn phòng và sơ vấn tài xế', category: 'Tuyển dụng' },
  { code: 'HR-F03', title: 'Phiếu kiểm tra đầu vào tài xế', sopCode: 'HR-SOP-02', description: 'Kiểm tra hồ sơ, thi lý thuyết ≥80đ, test cồn/ma túy và bài lái thử 45 phút', category: 'Tuyển dụng' },
  { code: 'HR-F04', title: 'Thư mời nhận việc (Offer Letter)', sopCode: 'HR-SOP-01', description: 'Thư mời chính thức quy định lương thử việc ≥85% và hồ sơ yêu cầu', category: 'Tuyển dụng' },
  { code: 'HR-F05', title: 'Checklist onboarding khối văn phòng', sopCode: 'HR-SOP-03', description: 'Quy trình hội nhập văn phòng: trước ngày nhận việc, ngày đầu, 30-60-90 ngày', category: 'Onboarding' },
  { code: 'HR-F06', title: 'Checklist onboarding tài xế', sopCode: 'HR-SOP-03', description: 'Hội nhập tài xế, học an toàn, chạy kèm mentor 3-5 chuyến trước khi phân xe độc lập', category: 'Onboarding' },
  { code: 'HR-F07', title: 'Phiếu đánh giá thử việc', sopCode: 'HR-SOP-03', description: 'Đánh giá 5 tiêu chí để ra quyết định ký hợp đồng lao động chính thức', category: 'Onboarding' },
  { code: 'HR-F08', title: 'Đơn xin nghỉ phép', sopCode: 'HR-SOP-06', description: 'Đăng ký nghỉ phép năm, nghỉ không lương, nghỉ ốm, sắp xếp tài xế thay thế', category: 'Chấm công & Phép' },
  { code: 'HR-F09', title: 'Phiếu đăng ký làm thêm giờ', sopCode: 'HR-SOP-05', description: 'Văn bản thỏa thuận tự nguyện làm thêm giờ, kiểm soát trần 40h/tháng, 200h/năm', category: 'Chấm công & Phép' },
  { code: 'HR-F10', title: 'Bảng theo dõi thời gian lái xe', sopCode: 'HR-SOP-05', description: 'Giám sát trần giờ lái: ≤4h liên tục, ≤10h/ngày, ≤48h/tuần theo Điều 64 Luật TTATGT 2024', category: 'Chấm công & Phép' },
  { code: 'HR-F11', title: 'Biên bản ghi nhận vi phạm', sopCode: 'HR-SOP-13', description: 'Ghi nhận hiện trường vi phạm nội quy, bằng chứng camera/GPS và ý kiến giải trình', category: 'An toàn & Kỷ luật' },
  { code: 'HR-F12', title: 'Biên bản họp xử lý kỷ luật lao động', sopCode: 'HR-SOP-13', description: 'Biên bản phiên họp hội đồng kỷ luật có đại diện BCH Công đoàn cơ sở', category: 'An toàn & Kỷ luật' },
  { code: 'HR-F13', title: 'Biên bản tai nạn / sự cố giao thông', sopCode: 'HR-SOP-12', description: 'Báo cáo tai nạn 5 phút, kích hoạt 15 phút, điều tra 7 ngày, hỗ trợ viện phí trong 24h', category: 'An toàn & Kỷ luật' },
  { code: 'HR-F14', title: 'Đơn khiếu nại / phản ánh (Kèm QR bãi xe)', sopCode: 'HR-SOP-14', description: 'Tiếp nhận phản ánh về tiền lương, giờ lái xe, đối xử nội bộ (hỗ trợ gửi ẩn danh)', category: 'An toàn & Kỷ luật' },
  { code: 'HR-F15', title: 'Đơn xin thôi việc', sopCode: 'HR-SOP-15', description: 'Đơn xin chấm dứt hợp đồng tuân thủ thời hạn báo trước theo luật', category: 'Đánh giá & Thôi việc' },
  { code: 'HR-F16', title: 'Checklist bàn giao và thanh toán thôi việc', sopCode: 'HR-SOP-15', description: 'Bàn giao xe ô tô, thẻ nhiên liệu, thiết bị GPS, công nợ và quyết toán ≤14 ngày', category: 'Đánh giá & Thôi việc' },
  { code: 'HR-F17', title: 'Phiếu đánh giá hiệu suất tài xế (Tháng)', sopCode: 'HR-SOP-10', description: 'Đánh giá 6 tiêu chí trọng số: An toàn 30%, Đúng giờ 20%, Xăng 15%, Hàng 15%, Tuân thủ 10%, Chuyên cần 10%', category: 'Đánh giá & Thôi việc' },
  { code: 'HR-F18', title: 'Phiếu đánh giá hiệu suất khối văn phòng', sopCode: 'HR-SOP-10', description: 'Đánh giá quý: Mục tiêu chức năng 70% + Giá trị cốt lõi và tuân thủ 30%', category: 'Đánh giá & Thôi việc' },
  { code: 'HR-F19', title: 'Phiếu phỏng vấn thôi việc (Exit Interview)', sopCode: 'HR-SOP-15', description: 'Khảo sát lý do nghỉ việc, cơ chế đãi ngộ, cải tiến giữ chân nhân tài', category: 'Đánh giá & Thôi việc' }
];

export const INITIAL_DRIVERS: DriverTelemetry[] = [
  {
    driverId: 'TX-0102',
    driverName: 'Nguyễn Văn Hùng',
    driverCode: 'DRV-102',
    phone: '0908123456',
    vehiclePlate: '51C-892.41',
    vehicleType: 'Xe đầu kéo container 40 feet',
    route: 'Tuyến Bắc Nam (TP.HCM - Đà Nẵng)',
    licenseClass: 'Hạng FC',
    licenseNumber: '790182391024',
    licenseExpiry: '2027-11-20',
    healthCertExpiry: '2027-04-15',
    continuousDrivingHours: 3.75, // Approaching 4h threshold!
    dailyDrivingHours: 8.8,
    weeklyDrivingHours: 43.5,
    status: 'driving',
    alcoholDrugCheck: 'passed',
    recentFatigueAlerts: [
      { id: 'ALT-1', time: '14:22', type: 'ngu_gat', resolved: true, resolutionNote: 'Đã gọi nhắc tài xế vào trạm dừng nghỉ 15p' }
    ]
  },
  {
    driverId: 'TX-0144',
    driverName: 'Trần Đình Trọng',
    driverCode: 'DRV-144',
    phone: '0912445566',
    vehiclePlate: '50H-118.90',
    vehicleType: 'Xe tải thùng 15 tấn',
    route: 'Tuyến Miền Tây (TP.HCM - Cần Thơ - Cà Mau)',
    licenseClass: 'Hạng C',
    licenseNumber: '790145281938',
    licenseExpiry: '2026-10-18', // Expiring in < 30 days!
    healthCertExpiry: '2026-10-15',
    continuousDrivingHours: 1.5,
    dailyDrivingHours: 4.2,
    weeklyDrivingHours: 28.0,
    status: 'driving',
    alcoholDrugCheck: 'passed',
    recentFatigueAlerts: []
  },
  {
    driverId: 'TX-0210',
    driverName: 'Lê Hoàng Nam',
    driverCode: 'DRV-210',
    phone: '0933778899',
    vehiclePlate: '51D-456.78',
    vehicleType: 'Xe đầu kéo rơ-moóc sàn',
    route: 'Cảng Cát Lái - KCN VSIP Bình Dương',
    licenseClass: 'Hạng FC',
    licenseNumber: '790177291033',
    licenseExpiry: '2028-02-10',
    healthCertExpiry: '2027-08-30',
    continuousDrivingHours: 0.0,
    dailyDrivingHours: 6.0,
    weeklyDrivingHours: 34.0,
    status: 'resting',
    alcoholDrugCheck: 'passed',
    recentFatigueAlerts: []
  },
  {
    driverId: 'TX-0305',
    driverName: 'Phạm Đức Minh',
    driverCode: 'DRV-305',
    phone: '0988665544',
    vehiclePlate: '60C-321.19',
    vehicleType: 'Xe tải lạnh 8 tấn',
    route: 'Đồng Nai - TP.HCM - Tiền Giang',
    licenseClass: 'Hạng C',
    licenseNumber: '750199201944',
    licenseExpiry: '2026-09-20', // EXPIRED!
    healthCertExpiry: '2026-09-15', // EXPIRED!
    continuousDrivingHours: 0.0,
    dailyDrivingHours: 0.0,
    weeklyDrivingHours: 0.0,
    status: 'suspended_docs', // Auto suspended due to expired license!
    alcoholDrugCheck: 'pending',
    recentFatigueAlerts: []
  },
  {
    driverId: 'TX-0418',
    driverName: 'Đặng Tuấn Anh',
    driverCode: 'DRV-418',
    phone: '0977881122',
    vehiclePlate: '51C-702.55',
    vehicleType: 'Xe container 20 feet',
    route: 'Kho Tân Bình - Cảng Hiệp Phước',
    licenseClass: 'Hạng FC',
    licenseNumber: '790166291901',
    licenseExpiry: '2027-09-12',
    healthCertExpiry: '2027-03-10',
    continuousDrivingHours: 2.1,
    dailyDrivingHours: 7.4,
    weeklyDrivingHours: 40.2,
    status: 'driving',
    alcoholDrugCheck: 'passed',
    recentFatigueAlerts: [
      { id: 'ALT-2', time: '16:05', type: 'dien_thoai', resolved: false, resolutionNote: 'Cảnh báo camera: Phát hiện cầm điện thoại khi xe đang chạy' }
    ]
  }
];

export const INITIAL_TASKS: SopTask[] = [
  {
    id: 'TSK-001',
    taskCode: 'TSK-2026-001',
    sopCode: 'HR-SOP-12',
    sopTitle: 'Xử lý tai nạn và sự cố giao thông (phần nhân sự)',
    stepNumber: 3,
    stepTitle: 'Điều độ kích hoạt đội ứng phó khẩn cấp',
    title: 'Kích hoạt đội ứng cứu khẩn cấp tai nạn xe 51C-892.41',
    description: 'Tài xế Nguyễn Văn Hùng vừa báo cáo sự cố va chạm nhẹ trên QL1A đoạn qua Bình Thuận. Cần kích hoạt Đội An toàn, thông báo bảo hiểm Bảo Việt và kiểm tra camera cabin.',
    assignedRole: 'ĐĐ',
    assigneeName: 'Trần Văn Long (Điều độ trưởng)',
    relatedStaffName: 'Nguyễn Văn Hùng (Tài xế)',
    staffType: 'driver',
    vehiclePlate: '51C-892.41',
    status: 'in_progress',
    priority: 'urgent',
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    dueAt: new Date(Date.now() + 7 * 60 * 1000).toISOString(), // 15 mins SLA
    slaRemainingMinutes: 7,
    relatedFormCode: 'HR-F13',
    history: [
      { timestamp: '14:30', action: 'Tạo tự động', actor: 'Hệ thống tự động hóa SOP', comment: 'Kích hoạt từ tín hiệu báo sự cố của tài xế (Bước 2 SOP-12)' },
      { timestamp: '14:32', action: 'Tiếp nhận', actor: 'Trần Văn Long', comment: 'Đang liên hệ trạm cứu hộ và giám sát camera' }
    ]
  },
  {
    id: 'TSK-002',
    taskCode: 'TSK-2026-002',
    sopCode: 'HR-SOP-05',
    sopTitle: 'Chấm công, thời giờ làm việc và làm thêm giờ',
    stepNumber: 2,
    stepTitle: 'Giám sát trần giờ lái xe (4h / 10h / 48h)',
    title: 'Cảnh báo nguy cơ vi phạm thời gian lái xe liên tục 4h',
    description: 'Tài xế Nguyễn Văn Hùng đã lái xe liên tục 3.75 giờ (225 phút). Cần thông báo tài xế táp trạm nghỉ 30 phút theo Điều 64 Luật Trật tự ATGT đường bộ 2024.',
    assignedRole: 'AT',
    assigneeName: 'Hoàng Minh Tuấn (Chuyên viên An toàn)',
    relatedStaffName: 'Nguyễn Văn Hùng (Tài xế)',
    staffType: 'driver',
    vehiclePlate: '51C-892.41',
    status: 'approval_required',
    priority: 'high',
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    dueAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    slaRemainingMinutes: 10,
    relatedFormCode: 'HR-F10',
    history: [
      { timestamp: '14:15', action: 'Phát hiện trần giờ', actor: 'Hệ thống GPS Telematics', comment: 'Vượt mốc 3.5 giờ liên tục' }
    ]
  },
  {
    id: 'TSK-003',
    taskCode: 'TSK-2026-003',
    sopCode: 'HR-SOP-04',
    sopTitle: 'Hợp đồng lao động và quản lý hồ sơ nhân sự',
    stepNumber: 4,
    stepTitle: 'Thiết lập cảnh báo tự động hạn giấy tờ',
    title: 'Xử lý đình chỉ điều xe tài xế Phạm Đức Minh do GPLX hết hạn',
    description: 'Hệ thống đã tự động khóa điều xe đối với tài xế Phạm Đức Minh do GPLX Hạng C hết hạn ngày 20/09/2026. HR cần liên hệ hỗ trợ thủ tục cấp đổi và bổ sung giấy khám sức khỏe mới.',
    assignedRole: 'HR',
    assigneeName: 'Lê Thị Thu Thảo (HR Chuyên trách hồ sơ)',
    relatedStaffName: 'Phạm Đức Minh (Tài xế)',
    staffType: 'driver',
    vehiclePlate: '60C-321.19',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    dueAt: new Date(Date.now() + 21 * 3600 * 1000).toISOString(),
    slaRemainingMinutes: 1260,
    history: [
      { timestamp: '08:00', action: 'Khóa điều xe', actor: 'Hệ thống tự động hóa SOP', comment: 'GPLX hết hiệu lực theo dữ liệu hồ sơ' }
    ]
  },
  {
    id: 'TSK-004',
    taskCode: 'TSK-2026-004',
    sopCode: 'HR-SOP-02',
    sopTitle: 'Kiểm tra đầu vào và sát hạch tài xế',
    stepNumber: 6,
    stepTitle: 'Lái thử thực hành trên đường thực tế',
    title: 'Sát hạch tay lái thực hành 45 phút cho ứng viên Bùi Quốc Khánh',
    description: 'Ứng viên lái xe đầu kéo Container 40 feet. Đã đạt lý thuyết 90/100, âm tính cồn & ma túy. Tổ chức chấm điểm thực hành khởi hành, lùi xe và xử lý tình huống bằng HR-F03.',
    assignedRole: 'AT',
    assigneeName: 'Phan Văn Đức (Giáo viên sát hạch nội bộ)',
    relatedStaffName: 'Bùi Quốc Khánh (Ứng viên)',
    staffType: 'driver',
    status: 'pending',
    priority: 'normal',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    dueAt: new Date(Date.now() + 19 * 3600 * 1000).toISOString(),
    slaRemainingMinutes: 1140,
    relatedFormCode: 'HR-F03',
    history: [
      { timestamp: '09:15', action: 'Đạt lý thuyết', actor: 'Bộ phận An toàn', comment: 'Điểm lý thuyết 90/100, đủ điều kiện lái thử' }
    ]
  },
  {
    id: 'TSK-005',
    taskCode: 'TSK-2026-005',
    sopCode: 'HR-SOP-03',
    sopTitle: 'Tiếp nhận (onboarding), thử việc và ký hợp đồng',
    stepNumber: 5,
    stepTitle: 'Lập phiếu đánh giá thử việc',
    title: 'Đánh giá hết thời gian thử việc nhân viên Điều vận Đỗ Thùy Trang',
    description: 'Thời gian thử việc 60 ngày khối văn phòng chuẩn bị kết thúc ngày 05/10/2026. Quản lý trực tiếp lập phiếu HR-F07 để trình Giám đốc ký HĐLĐ chính thức.',
    assignedRole: 'QL',
    assigneeName: 'Vũ Quốc Bảo (Trưởng phòng Điều vận)',
    relatedStaffName: 'Đỗ Thùy Trang (Chuyên viên Điều vận)',
    staffType: 'office',
    status: 'in_progress',
    priority: 'normal',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    dueAt: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    slaRemainingMinutes: 2880,
    relatedFormCode: 'HR-F07',
    history: [
      { timestamp: 'Hôm qua', action: 'Nhắc hạn thử việc', actor: 'Hệ thống tự động hóa SOP' }
    ]
  },
  {
    id: 'TSK-006',
    taskCode: 'TSK-2026-006',
    sopCode: 'HR-SOP-05',
    sopTitle: 'Chấm công, thời giờ làm việc và làm thêm giờ',
    stepNumber: 4,
    stepTitle: 'Phê duyệt phiếu làm thêm giờ',
    title: 'Phê duyệt đăng ký làm thêm giờ ca đêm bốc dỡ hàng Cảng Cát Lái',
    description: 'Đề xuất làm thêm 3 giờ cho 4 tài xế chạy ca chuyển hàng gấp. Đã có chữ ký đồng ý tự nguyện của tài xế trên phiếu HR-F09; tổng giờ làm thêm tháng vẫn dưới 40h.',
    assignedRole: 'BGĐ',
    assigneeName: 'Ban Giám đốc',
    staffType: 'driver',
    status: 'approval_required',
    priority: 'normal',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    dueAt: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
    slaRemainingMinutes: 360,
    relatedFormCode: 'HR-F09',
    history: [
      { timestamp: '12:40', action: 'Nộp phiếu HR-F09', actor: 'Đội trưởng Đội xe số 2' }
    ]
  },
  {
    id: 'TSK-007',
    taskCode: 'TSK-2026-007',
    sopCode: 'HR-SOP-14',
    sopTitle: 'Giải quyết khiếu nại và quan hệ lao động',
    stepNumber: 2,
    stepTitle: 'Ghi nhận và phản hồi xác nhận',
    title: 'Tiếp nhận phản ánh về phân chia chuyến xe không đều tại Bãi xe Sóng Thần',
    description: 'Phản ánh ẩn danh qua quét mã QR bãi xe (HR-F14) về việc điều độ ưu tiên các chuyến có cước cao cho tài xế quen. HR cần báo nhận và cử cán bộ xác minh bảo mật.',
    assignedRole: 'HR',
    assigneeName: 'Nguyễn Thanh Tùng (Chuyên viên Quan hệ lao động)',
    staffType: 'driver',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    dueAt: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    slaRemainingMinutes: 180,
    relatedFormCode: 'HR-F14',
    history: [
      { timestamp: '10:00', action: 'Tiếp nhận qua QR Code bãi xe', actor: 'Cổng tiếp nhận ẩn danh' }
    ]
  },
  {
    id: 'TSK-008',
    taskCode: 'TSK-2026-008',
    sopCode: 'HR-SOP-15',
    sopTitle: 'Thôi việc, bàn giao và thanh toán',
    stepNumber: 6,
    stepTitle: 'Quyết toán lương và các khoản chế độ',
    title: 'Quyết toán công nợ và chi trả trợ cấp thôi việc tài xế Nguyễn Anh Tuấn',
    description: 'Tài xế đã hoàn tất bàn giao xe 51D-234.11 ngày 25/09/2026 theo HR-F16. Kế toán cần hoàn tất chi trả tiền lương và ngày phép còn tồn trước ngày 09/10/2026 (trong hạn 14 ngày).',
    assignedRole: 'KT',
    assigneeName: 'Đặng Mai Phương (Kế toán tiền lương)',
    relatedStaffName: 'Nguyễn Anh Tuấn (Tài xế cũ)',
    staffType: 'driver',
    vehiclePlate: '51D-234.11',
    status: 'in_progress',
    priority: 'normal',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    dueAt: new Date(Date.now() + 8 * 24 * 3600 * 1000).toISOString(),
    slaRemainingMinutes: 11520,
    relatedFormCode: 'HR-F16',
    history: [
      { timestamp: '25/09', action: 'Hoàn tất bàn giao xe', actor: 'Đội trưởng đội xe' }
    ]
  }
];

export const ANNUAL_EVENTS: AnnualEvent[] = [
  { period: 'Hàng tuần', activity: 'Báo cáo giờ lái xe, cảnh báo giấy tờ tài xế sắp hết hạn, tuyển dụng tài xế theo đợt', sopCodes: ['HR-SOP-04', 'HR-SOP-05', 'HR-SOP-11'], quarter: 'Thường xuyên' },
  { period: 'Hàng tháng', activity: 'Chốt công ngày 25, tính và trả lương ngày 5, nộp BHXH, đánh giá hiệu suất tài xế, test cồn/ma túy ngẫu nhiên ≥10%', sopCodes: ['HR-SOP-05', 'HR-SOP-07', 'HR-SOP-08', 'HR-SOP-10', 'HR-SOP-11'], quarter: 'Thường xuyên' },
  { period: 'Hàng quý', activity: 'Rà soát định biên, đánh giá hiệu suất văn phòng, kiểm kê hồ sơ (10%), báo cáo khiếu nại, rà soát quyền dữ liệu', sopCodes: ['HR-SOP-01', 'HR-SOP-04', 'HR-SOP-10', 'HR-SOP-14', 'HR-SOP-16'], quarter: 'Hàng quý' },
  { period: 'Tháng 1 đến 3', activity: 'Đánh giá năm, xét nâng lương, quyết toán thuế TNCN, thưởng Tết Nguyên Đán', sopCodes: ['HR-SOP-07', 'HR-SOP-08', 'HR-SOP-10'], quarter: 'Quý I' },
  { period: 'Tháng 4 đến 6', activity: 'Đào tạo an toàn lái xe kỳ 1, khám sức khỏe định kỳ người lái xe, khảo sát gắn kết nhân viên', sopCodes: ['HR-SOP-09', 'HR-SOP-11', 'HR-SOP-14'], quarter: 'Quý II' },
  { period: 'Tháng 7 đến 9', activity: 'Rà soát chính sách lương thưởng, cập nhật thay đổi pháp luật, tổ chức đối thoại định kỳ tại nơi làm việc', sopCodes: ['HR-SOP-08', 'HR-SOP-14'], quarter: 'Quý III' },
  { period: 'Tháng 10 đến 12', activity: 'Đào tạo an toàn kỳ 2, khảo sát nhu cầu đào tạo, lập kế hoạch nhân sự và ngân sách năm tới, chốt quỹ phép', sopCodes: ['HR-SOP-01', 'HR-SOP-06', 'HR-SOP-09'], quarter: 'Quý IV' }
];

export const ROADMAP_90_DAYS: RoadmapMilestone[] = [
  {
    stage: 'Giai đoạn 1',
    days: 'Ngày 1 đến 30',
    tasks: [
      'Khảo sát hiện trạng quy trình nhân sự và bãi xe',
      'Chốt nhóm quy trình ưu tiên (SOP-01, 02, 03, 05, 07, 11, 12, 13)',
      'Pháp chế rà soát nội quy lao động và hợp đồng lao động chuẩn',
      'Chuẩn hóa 19 biểu mẫu và checklist điện tử'
    ],
    deliverable: 'Bản chốt v1.0, Nội quy lao động cập nhật đăng ký',
    completed: true
  },
  {
    stage: 'Giai đoạn 2',
    days: 'Ngày 31 đến 60',
    tasks: [
      'Tập huấn quản lý, đội trưởng đội xe, nhân viên điều độ',
      'Thí điểm triển khai tại 1-2 đội xe lớn và khối văn phòng',
      'Thiết lập hệ thống báo cáo KPI và cảnh báo giờ lái xe tự động',
      'Thu thập phản hồi cải tiến quy trình thực tế'
    ],
    deliverable: 'Báo cáo thử nghiệm thí điểm, SOP hoàn thiện',
    completed: true
  },
  {
    stage: 'Giai đoạn 3',
    days: 'Ngày 61 đến 90',
    tasks: [
      'Triển khai toàn diện trên toàn công ty (500 nhân sự: 100 VP + 400 tài xế)',
      'Công bố áp dụng chính thức, tổ chức đào tạo đại trà cho tài xế',
      'Đăng ký Nội quy lao động với cơ quan quản lý lao động',
      'Vận hành chính thức Dashboard theo dõi tiến độ nhiệm vụ thời gian thực'
    ],
    deliverable: 'Ban hành chính thức toàn hệ thống, Dashboard KPI thời gian thực',
    completed: true
  },
  {
    stage: 'Giai đoạn 4',
    days: 'Sau 90 ngày',
    tasks: [
      'Triển khai các SOP còn lại (SOP-04, 06, 08, 09, 10, 14, 15, 16)',
      'Tự đánh giá tuân thủ (Audit nội bộ) sau 6 tháng áp dụng',
      'Tối ưu hóa các điểm nghẽn SLA trong xử lý sự cố và thanh toán thôi việc'
    ],
    deliverable: 'Báo cáo Audit tuân thủ định kỳ 6 tháng',
    completed: false
  }
];

export const LEGAL_REFERENCES = [
  {
    field: 'Lao động & Việc làm',
    document: 'Bộ luật Lao động 2019 (45/2019/QH14) & Nghị định 145/2020/NĐ-CP; Nghị định 283/2026/NĐ-CP về xử phạt hành chính trong lĩnh vực lao động, BHXH (hiệu lực từ 10/09/2026).',
    keyPoints: 'Nghiêm cấm giữ bằng lái/giấy tờ bản chính; quy định chặt chẽ thỏa thuận làm thêm giờ tự nguyện, trần 40h/tháng, 200h/năm; thời hạn giải quyết thôi việc trong 14 ngày làm việc.'
  },
  {
    field: 'Giao thông vận tải đường bộ',
    document: 'Luật Trật tự, an toàn giao thông đường bộ 2024 (Điều 64); Luật Đường bộ 2024; Nghị định 168/2024/NĐ-CP về xử phạt vi phạm giao thông.',
    keyPoints: 'Quy định trần thời gian lái xe tối đa: không quá 10 giờ/ngày, không quá 48 giờ/tuần, không lái liên tục quá 4 giờ. Phạt nặng người điều hành và chủ phương tiện vận tải nếu tài xế vi phạm.'
  },
  {
    field: 'An toàn, vệ sinh lao động',
    document: 'Luật An toàn, vệ sinh lao động 2015 và các thông tư hướng dẫn.',
    keyPoints: 'Bắt buộc khám sức khỏe định kỳ cho người lái xe; huấn luyện ATVSLĐ bắt buộc; người lao động có quyền từ chối chạy xe khi nhận thấy nguy cơ rõ ràng đe dọa an toàn.'
  },
  {
    field: 'Bảo hiểm & Thuế',
    document: 'Luật Bảo hiểm xã hội 2024; Luật Bảo hiểm y tế; Luật Việc làm; Luật Thuế thu nhập cá nhân hiện hành.',
    keyPoints: 'Báo tăng lao động trong 30 ngày; thu nhập theo chuyến/km của tài xế phải xác định vào quỹ đóng BHXH theo hướng dẫn cơ quan BHXH.'
  },
  {
    field: 'Bảo vệ dữ liệu cá nhân',
    document: 'Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân & Luật Bảo vệ dữ liệu cá nhân.',
    keyPoints: 'Dữ liệu vị trí xe GPS, camera nhận diện khuôn mặt trong cabin, kết quả test cồn/ma túy và bệnh án là dữ liệu nhạy cảm; bắt buộc có văn bản đồng ý trước khi thu thập.'
  }
];

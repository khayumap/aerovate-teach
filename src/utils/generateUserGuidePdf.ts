import { jsPDF } from 'jspdf';

export function generateUserGuidePdf() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Helper colors
  const primaryBlue = [37, 99, 235]; // #2563eb
  const darkSlate = [15, 23, 42]; // #0f172a
  const mutedSlate = [100, 116, 139]; // #64748b
  const accentAmber = [245, 158, 11]; // #f59e0b
  const successGreen = [22, 163, 74]; // #16a34a
  const bgLight = [248, 250, 252]; // #f8fafc

  // ==========================================
  // PAGE 1: COVER & STUDENT GUIDE
  // ==========================================

  // Header Banner Background
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Decorative Accent Bar
  doc.setFillColor(accentAmber[0], accentAmber[1], accentAmber[2]);
  doc.rect(0, 42, pageWidth, 3, 'F');

  // School & Platform Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('YAMANIYYA ENGLISH MEDIUM SCHOOL', margin, 14);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Aerovate Class 5 Science Teaching Platform', margin, 21);

  doc.setFontSize(9);
  doc.setTextColor(254, 240, 138); // light yellow
  doc.text('Student User Guide · For Class 5A & 5B', margin, 28);
  doc.text('Teacher: Mrs. Jesni · Helpline: +91 7736419753 · Built by Adnan Ahmad A P', margin, 34);

  // SECTION: PART 1 - STUDENT GUIDE
  let y = 54;

  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('PART 1: STUDENT USER GUIDE (CLASS 5A & 5B)', margin, y);

  y += 2;
  doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + contentWidth, y);

  y += 7;

  // Step 1: Sign Up
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'D');

  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('1. How to Sign Up & Login (Very Easy for Kids)', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text('• Click "Student Login" in the top bar or mobile menu.', margin + 4, y + 11);
  doc.text('• Select "Sign Up" if you are new: Enter your Real Full Name, Roll Number, and Class (5A or 5B).', margin + 4, y + 15.5);
  doc.text('• Pick your favorite animal avatar (Lion, Tiger, Dolphin, Rocket, Butterfly, Owl)!', margin + 4, y + 20);

  y += 28;

  // Step 2: Learning Science Lessons
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'D');

  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('2. Learning Chapter 1: Rocks and Minerals', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text('• Open "Lessons & Chapters" to read the complete 7-part curriculum matching textbook pages 1-7.', margin + 4, y + 11);
  doc.text('• Switch between English and Malayalam anytime with the language button.', margin + 4, y + 15.5);
  doc.text('• Tap "Listen to Chapter Audio" to hear teacher narration aloud in English or Malayalam!', margin + 4, y + 20);

  y += 28;

  // Step 3: Interactive Rock Lab
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'D');

  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('3. Interactive Rock Lab & Virtual Experiments', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text('• Specimen Deck: Inspect Pumice, Granite, Obsidian, and Sandstone with floating properties.', margin + 4, y + 11);
  doc.text('• Mineral Classifier: Drag and sort items into Metallic (Iron, Gold) vs Non-Metallic (Talc, Quartz).', margin + 4, y + 15.5);
  doc.text('• Rock Detective: Guess rock origins (Igneous, Sedimentary, Metamorphic) with immediate clues.', margin + 4, y + 20);

  y += 28;

  // Step 4: Quizzes, Stars & Badges
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'D');

  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('4. Taking Quizzes & Earning Gold Stars', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text('• Tap "Quizzes & Badges" to take the 10-question Grand Science Quiz.', margin + 4, y + 11);
  doc.text('• Instant answer explanations show you why each option is right or wrong.', margin + 4, y + 15.5);
  doc.text('• Scoring 70%+ awards you a certified digital badge and adds stars directly to your profile!', margin + 4, y + 20);

  y += 28;

  // Step 5: WhatsApp Teacher Helpline
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'D');

  doc.setTextColor(successGreen[0], successGreen[1], successGreen[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('5. Need Help? Ask Teacher Mrs. Jesni on WhatsApp', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text('• Tap the green "Ask Mrs. Jesni" button to send questions directly to WhatsApp (+91 7736419753).', margin + 4, y + 11);
  doc.text('• Pre-formatted question templates let you ask about Pumice, Magma, or homework in 1 tap.', margin + 4, y + 15.5);

  // Footer for Page 1
  doc.setFontSize(8);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text('Page 1 of 2 · Class 5 Science User Guide · YAMANIYYA ENGLISH MEDIUM SCHOOL', margin, pageHeight - 8);
  doc.text('Copyrights Adnan Ahmad A P', contentWidth - 10, pageHeight - 8);

  // Save the student guide PDF directly to download
  doc.save('Aerovate_Class5_Science_User_Guide.pdf');
}

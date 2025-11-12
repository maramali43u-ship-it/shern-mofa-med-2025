// متغير لتتبع حالة التحديث
let hasUpdated = false;

// دالة لتبديل الشريط الجانبي
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// دالة لعرض النتيجة
function showResult() {
    const examNumber = document.getElementById('examNumber').value;
    
    if (!examNumber) {
        alert('الرجاء إدخال الرقم الامتحاني');
        return;
    }
    
    // إضافة تأثير التحميل
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading"></span> جاري التحميل...';
    button.disabled = true;
    
    // محاكاة التحميل
    setTimeout(() => {
        const student = students.find(s => s.id === examNumber);
        
        if (student) {
            // تحديث معلومات الطالب
            document.querySelector('.student-details h3').innerHTML = '<i class="fas fa-user-circle"></i> ' + student.name;
            document.querySelector('.percentage-left').textContent = student.average + '/100';
            document.querySelector('.percentage-right').textContent = student.average + '%';
            
            // تحديث اسم الطالب في الشريط الجانبي
            document.querySelector('.student-name').textContent = student.name;
            
            // تحديث اسم الطالب في صفحة الملف الشخصي
            document.querySelector('.profile-header h2').textContent = student.name;
            
            // حساب رقم الاكتتاب
            const subscriptionNumber = examNumber.replace(/^240[234]/, '');
            document.querySelectorAll('.item-value')[0].textContent = subscriptionNumber;
            document.querySelectorAll('.info-row span:last-child')[3].textContent = subscriptionNumber;
            
            // إعادة تعيين حالة التحديث
            hasUpdated = false;
            
            // الانتقال إلى صفحة النتائج
            showPage('resultPage');
            
            // إظهار الإشعار بعد فترة قصيرة
            setTimeout(() => {
                showNotification();
            }, 2000);
        } else {
            alert('الرقم الامتحاني غير صحيح');
        }
        
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
}

// دالة لعرض صفحة معينة
function showPage(pageId) {
    // إخفاء جميع الصفحات
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // إظهار الصفحة المطلوبة
    document.getElementById(pageId).classList.remove('hidden');
    
    // التحقق من حالة التحديث عند عرض صفحة النتائج
    if (pageId === 'resultPage') {
        const showResultBtn = document.querySelector('.btn-show-result');
        if (hasUpdated) {
            showResultBtn.classList.remove('hidden');
        } else {
            showResultBtn.classList.add('hidden');
        }
    }
    
    // إغلاق الشريط الجانبي إذا كان مفتوحاً
    document.getElementById('sidebar').classList.remove('active');
}

// دالة للانتقال إلى صفحة النتيجة المقبولة
function showAcceptanceResult() {
    showPage('acceptancePage');
}

// دالة للانتقال إلى الملف الشخصي
function goToProfile() {
    showPage('profilePage');
}

// دالة لإلغاء المفاضلة
function cancelAdmission() {
    showPage('cancelPage');
}

// دالة للتسجيل في مفاضلة جديدة
function goToNewAdmission() {
    showPage('noAdmissionPage');
}

// دالة للانتقال إلى صفحة الرغبات
function goToPreferences() {
    showPage('noPreferencesPage');
}

// دالة للانتقال إلى امتحانات القبول
function goToExams() {
    showPage('examsPage');
}

// دالة للعودة إلى صفحة البطاقة الأساسية
function goToResultPage() {
    showPage('resultPage');
}

// دالة لإظهار الإشعار
function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// دالة لإغلاق الإشعار
function closeNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 300);
}

// دالة لتحديث التطبيق
function updateApp() {
    closeNotification();
    
    // تعيين حالة التحديث إلى true
    hasUpdated = true;
    
    // إظهار زر إظهار النتيجة
    const showResultBtn = document.querySelector('.btn-show-result');
    showResultBtn.classList.remove('hidden');
    
    // تأثير حركي عند ظهور الزر
    showResultBtn.style.opacity = '0';
    showResultBtn.style.transform = 'translateY(20px)';
    setTimeout(() => {
        showResultBtn.style.transition = 'all 0.5s ease';
        showResultBtn.style.opacity = '1';
        showResultBtn.style.transform = 'translateY(0)';
    }, 100);
}

// دالة لحساب رقم الاكتتاب
function getSubscriptionNumber(examNumber) {
    return examNumber.replace(/^240[234]/, '');
}

// إغلاق الشريط الجانبي عند النقر خارجها
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// معالجة إدخال الرقم الامتحاني
document.getElementById('examNumber').addEventListener('input', function(e) {
    // السماح بالأرقام فقط
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    
    // الحد الأقصى 9 أرقام
    if (e.target.value.length > 9) {
        e.target.value = e.target.value.slice(0, 9);
    }
});

// معالجة الضغط على Enter في حقل الإدخال
document.getElementById('examNumber').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        showResult();
    }
});

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إظهار صفحة تسجيل الدخول افتراضياً
    showPage('loginPage');
});
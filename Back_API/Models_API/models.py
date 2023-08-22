from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class admin_user(models.Model):
    adminid = models.AutoField(primary_key=True)
    adminname = models.CharField(max_length=50, blank=True)
    fullname = models.CharField(max_length=100, blank=True)
    password = models.CharField(max_length=50, blank=True)
    usertype = models.CharField(default="Admin", max_length=10, blank=True)

    def save(self, *args, **kwargs):  
        self.fullname = self.fullname.lower().strip()
        self.fullname = " ".join(word.capitalize() for word in self.fullname.split())
        super().save(*args, **kwargs)
        
class department(models.Model):  # phòng ban
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        # Chuyển đổi và chuẩn hóa department_name
        self.department_name = self.department_name.lower().strip()
        self.department_name = " ".join(word.capitalize() for word in self.department_name.split())
        super().save(*args, **kwargs)


class specialty(models.Model):  # chuyên khoa
    specialty_id = models.AutoField(primary_key=True)
    specialty_name = models.CharField(max_length=100)

    def __str__(self):
        return self.specialty_name
    

    def save(self, *args, **kwargs):
        # Chuyển đổi và chuẩn hóa specialty_name
        self.specialty_name = self.specialty_name.lower().strip()
        # lower viết thường tất cả, strip bỏ khoảng trắng đầu và cuối
        self.specialty_name = " ".join(word.capitalize() for word in self.specialty_name.split())
        # viết hoa capitalize() từ sau khoảng trắng, vòng lặp để loại bỏ đi những khoảng trắng sau cùng sau đó nổi bằng join
        super().save(*args, **kwargs)


class employee(models.Model):  # nhân viên
    employee_id = models.AutoField(primary_key=True)
    employee_name = models.CharField(max_length=100, blank=True)
    department = models.ForeignKey(department, on_delete=models.CASCADE)
    dateofjoining = models.DateField(blank=True, null=True)
    photofilename = models.CharField(max_length=100, blank=True)

    def date_joining_fm(self):
        date = self.dateofjoining.strftime("%d/%m/%y")
        return date


class patient(models.Model):  # bệnh nhân
    patient_id = models.AutoField(primary_key=True)
    patient_name = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=10, blank=True)
    date_ob = models.DateField(blank=True, null=True)
    phone_pt = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True, null=True)
    password = models.CharField(max_length=50, blank=True)
    usertype = models.CharField(max_length=100, blank=True)
    image_pt = models.CharField(blank=True, max_length=400)


    def __str__(self):
        return self.patient_name
    # def date_ob_fm(self):  # định dạng date_ob
    #     date = self.date_ob.strftime("%d/%m/%Y")
    #     return date


class doctor(models.Model):  # bác sĩ
    # user_dt = models.OneToOneField(User, on_delete=models.CASCADE)
    dt_id = models.AutoField(primary_key=True)
    dt_name = models.CharField(max_length=100, blank=True)
    specialty_id = models.ForeignKey(specialty, on_delete=models.CASCADE)
    email = models.CharField(max_length=100, null=True)
    phone_dt = models.CharField(max_length=20, blank=False)
    password = models.CharField(max_length=50, blank=False)
    usertype = models.CharField(max_length=100, blank=True)
    image_dt = models.CharField(blank=True, max_length=400)

    def __str__(self):
        return self.dt_name
    @property
    def specialty_name(self):
        return self.specialty_id.specialty_name

    def save(self, *args, **kwargs):
        # Chuyển đổi và chuẩn hóa specialty_name
        self.dt_name = self.dt_name.lower().strip()
        # lower viết thường tất cả, strip bỏ khoảng trắng đầu và cuối
        self.dt_name = " ".join(word.capitalize() for word in self.dt_name.split())
        # viết hoa capitalize() từ sau khoảng trắng, vòng lặp để loại bỏ đi những khoảng trắng sau cùng sau đó nổi bằng join
        super().save(*args, **kwargs)

class appointment(models.Model):  # lịch khám
    apm_id = models.AutoField(primary_key=True)
    date_med_exam = models.DateField(blank=True, null=True)  # ngày khám
    clinic = models.CharField(blank=True, max_length=100)  # phòng khám
    patient_id = models.ForeignKey(patient, on_delete=models.CASCADE)
    dt_id = models.ForeignKey(doctor, on_delete=models.CASCADE)
    status = models.CharField(blank=True, max_length=250)
    note = models.TextField(blank=True)

    @property
    def dt_name(self):
        return self.dt_id.dt_name
    
    @property
    def phone_dt(self):
        return self.dt_id.phone_dt
    
    @property
    def specialty_name(self):
        return self.dt_id.specialty_id.specialty_name
    
    @property
    def image_dt(self):
        return self.dt_id.image_dt
    
    @property
    def date_ob(self):
        return self.patient_id.date_ob
    
    @property
    def phone_pt(self):
        return self.patient_id.phone_pt
    
    @property
    def patient_name(self):
        return self.patient_id.patient_name
    
    def date_med_exam_fm(self):  # định dạng date_ob
        date = self.date_med_exam.strftime("%d/%m/%y")
        return date


class invoice(models.Model):  # hóa đơn
    invoice_id = models.AutoField(primary_key=True)
    invoice_date = models.DateField(blank=True, auto_now_add=True, null=True)
    total_money = models.DecimalField(max_digits=30, decimal_places=3)

    @property
    def patient_name(self):
        return self.patient_name
    
    # định dạng thời gian cho ngày lập hóa đơn
    def __str__(self):
        return self.total_money
    def invoice_date_fm(self):  # định dạng invoice_date
        date = self.invoice_date.strftime("%d/%m/%Y")
        return date


class medicalrecord(models.Model):  # phiếu khám
    medicalrecord_id = models.AutoField(primary_key=True)
    date_med_exam = models.DateField(blank=True, null=True)  # ngày khám
    symptom = models.TextField(blank=True, null=True)  # triệu chứng
    diagnostic = models.TextField(blank=True, null=True)  # chuẩn đoán
    patient_id = models.ForeignKey(patient, on_delete=models.CASCADE)
    dt_id = models.ForeignKey(doctor, on_delete=models.CASCADE)
    invoice_id = models.ForeignKey(invoice, on_delete=models.CASCADE)

    @property
    def dt_name(self):
        return self.dt_id.dt_name
    
    @property
    def patient_name(self):
        return self.patient_id.patient_name
    
    @property
    def total_money(self):
        return self.invoice_id.total_money
    
    @property
    def invoice_date(self):
        return self.invoice_id.invoice_date
    
    
# خطة حل مشكلة الكوستم دومين `hustlenationae.online`

## التشخيص
- المشروع شغال تمام على:
  - `https://hustlenationae.lovable.app` ✅
  - `https://id-preview--ef909252-...lovable.app` ✅
- المشكلة `ERR_CONNECTION_TIMED_OUT` بتيجي من إن الدومين `hustlenationae.online` مش بيوصل لسيرفرات Lovable
- السبب: إعدادات DNS عند مزود الدومين (مش في كود المشروع)

## الخطوات

### 1. مراجعة حالة الدومين داخل Lovable
- فتح **Project Settings → Domains**
- مشاهدة حالة الدومين (Active / Offline / Verifying / Failed)
- لو الحالة **Offline** أو **Failed** → نعمل Retry أو نشيل الدومين ونعيد ربطه

### 2. مراجعة DNS Records عند مزود الدومين
لازم تكون موجودة بالظبط:

```text
Type  | Name     | Value
------+----------+------------------
A     | @        | 185.158.133.1
A     | www      | 185.158.133.1
TXT   | _lovable | (القيمة من Lovable)
```

- مسح أي `A` records قديمة بتشاور على IP تاني
- مسح أي `CNAME` متعارض على `@` أو `www`

### 3. التعامل مع Cloudflare (لو مستخدم)
- لو الدومين على Cloudflare: تطفية الـ Proxy (السحابة رمادية مش برتقالية = DNS only)
- **أو** تفعيل خيار **"Domain uses Cloudflare or a similar proxy"** من **Connect Domain → Advanced** في Lovable عشان يستخدم CNAME بدل A records

### 4. إعادة ربط الدومين لو لزم الأمر
لو الإعدادات كلها سليمة والمشكلة مستمرة:
1. حذف الدومين من **Project Settings → Domains**
2. إعادة إضافته من جديد عبر **Connect Domain**
3. اتباع التعليمات الجديدة من Lovable

### 5. التحقق والانتظار
- استخدام [DNSChecker.org](https://dnschecker.org) للتأكد إن الـ `A` records وصلت لكل العالم
- الانتظار من 15 دقيقة لحد 72 ساعة لانتشار DNS بالكامل
- بعد التحقق، Lovable هتعمل SSL تلقائيًا

### 6. تأكيد العمل
- فتح `https://hustlenationae.online` و `https://www.hustlenationae.online`
- التأكد إن الموقع بيفتح بـ HTTPS من غير تحذيرات

## ملاحظات
- **مفيش أي تعديل في كود المشروع مطلوب** — الكود سليم والـ published URL شغال
- لو الدومين متشتري من Lovable نفسه: ممكن إدارة الـ DNS من **⋯ → Configure → Manage DNS records** مباشرة من داخل Lovable
- لو متشتري من بره (GoDaddy / Namecheap / إلخ): لازم تعديل الإعدادات من لوحة تحكم مزود الدومين

## لو احتجت مساعدة إضافية
ابعتلي screenshot من:
1. صفحة Domains في Lovable (حالة الدومين)
2. صفحة DNS عند مزود الدومين

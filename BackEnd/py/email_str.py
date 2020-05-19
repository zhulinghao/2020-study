client_name = '喜洋洋'
date = '2019-08-28'
send_name = '沸羊羊'
send_position = '检验主管'
send_mobile = '18045443563'
send_email = '123@qq.com'

html_message = '<style>.cn {font-family: 黑体;}.en {font-family: Arial;}</style>' \
                '<div class="cn">尊敬的%s客户:</div>' \
                '<div class="cn">您好!</div>' \
                '<div class="cn">%s号检测报告在附件中，请查阅，有问题麻烦您告知！</div>' \
                '<div class="cn">谢谢!</div>' \
                '<br />' \
                '<div class="en">Dear Sir/Madam</div>' \
                '<div class="en">Attachment is %s inspection report ,pls review it, any problem pls tell me!</div>' \
                '<div class="en">Thank you!</div>' \
                '<br />' \
                '<div class="cn">发件人：%s</div>' \
                '<div class="cn">职位：%s</div>' \
                '<div class="cn">手机：%s</div>' \
                '<div class="cn">电话：86 (0) 21 54302933</div>' \
                '<div class="cn">邮箱：%s</div>' \
                '<div class="cn">地址：上海闵行区沧源路1200号3号楼327室</div>' \
                '<br />' \
                '<div class="en">Sender: %s</div>' \
                '<div class="en">Position: %s</div>' \
                '<div class="en">Phone: %s</div>' \
                '<div class="en">Telephone: 86 (0) 21 54302933</div>' \
                '<div>E-mail: %s</div>' \
                '<div class="en">Address: room 327, building 3, 1200 cangyuan road, minhang district, Shanghai</div>' % (client_name, date, date, send_name, send_position, send_mobile, send_email, send_name, send_position, send_mobile, send_email)

print(html_message)
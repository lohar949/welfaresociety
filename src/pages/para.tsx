import React from 'react'

function Para({ language = 'en' }) {
  return (
    <div className=' ml-[10vw] mr-[10vw] rounded-xl   shadow-md bg-orange-100/30 backdrop-blur-md flex
    justify-center items-center flex-col'>
       <div className='p-5  rounded-md max-w-5xl text-center '> <div>{language==="en" ? "AIM" : "लक्ष्य"}</div><p>{language==="en"
        ? "The aim of Lohar Samaj Education & Welfare Society is to create a strong, educated, and self-reliant community by promoting access to quality education, providing support for underprivileged students, encouraging vocational training, and initiating welfare programs. We are committed to preserving the cultural values of our community while working towards social harmony, economic empowerment, and overall development of the Lohar Samaj across generations."
        : "लोहार समाज एजुकेशन एंड वेलफेयर सोसाइटी का उद्देश्य एक मजबूत, शिक्षित और आत्मनिर्भर समुदाय का निर्माण करना है, जिसमें गुणवत्तापूर्ण शिक्षा की पहुँच, वंचित छात्रों के लिए सहायता, व्यावसायिक प्रशिक्षण को प्रोत्साहन और कल्याणकारी कार्यक्रमों की शुरुआत शामिल है। हम अपनी सांस्कृतिक मूल्यों को संरक्षित रखते हुए सामाजिक समरसता, आर्थिक सशक्तिकरण और समाज के समग्र विकास के लिए प्रतिबद्ध हैं।"}
        </p>
          </div>
          <div className='  rounded-md max-w-5xl '>
            <div className='bg-slate-600/70 m-[10px] h-[3px]  rounded-sm '>
            <br  />
            </div>
            <div className='pl-5'>
            <div className='text-center'>{language==="en" ? "1. Education support-Future goal" : "1. शिक्षा सहायता - भविष्य का लक्ष्य"}</div>
            <div>{language==="en" ? "1. Provide Educational Guidence through Mentors" : "1. मेंटर्स के माध्यम से शैक्षिक मार्गदर्शन प्रदान करना"}</div>
            <div>{language==="en" ? "2. Provide Financial help for Desrving candidates" : "2. योग्य उम्मीदवारों को वित्तीय सहायता प्रदान करना"}</div>
            <div>{language==="en" ? "3. Provide form fees of Govt exams for all students of lohar samaj so they can give maximum exams and probability of getting govt job will increase" : "3. लोहार समाज के सभी छात्रों के लिए सरकारी परीक्षाओं की फॉर्म फीस देना ताकि वे अधिकतम परीक्षाएँ दे सकें और सरकारी नौकरी पाने की संभावना बढ़े"}</div>
            <div>{language==="en" ? "4. Conduct off line/ on line Test series for All India Muslim Lohar samaj" : "4. ऑल इंडिया मुस्लिम लोहार समाज के लिए ऑफलाइन/ऑनलाइन टेस्ट सीरीज़ आयोजित करना"}</div></div>
            <div className='bg-slate-600/70 m-[10px] h-[3px]  rounded-sm '>
        <br  />
       </div>
       <div className='pl-5'>
            <div className='text-center'>{language==="en" ? "2. Social Welfare" : "2. सामाजिक कल्याण"}</div>
            <div>{language==="en" ? "•  🩸 Blood Donation Camps" : "•  🩸 रक्तदान शिविर"}</div>
            <div>{language==="en" ? "Regular camps organized across cities to support emergency ne" : "आपातकालीन आवश्यकताओं के लिए विभिन्न शहरों में नियमित शिविर आयोजित किए जाते हैं"}</div>
            <div>{language==="en" ? "•  👩‍🎓 Women Empowerment ProgramsSkill training workshops, health awareness drives, and financial literacy sessions for women." : "•  👩‍🎓 महिला सशक्तिकरण कार्यक्रम: महिलाओं के लिए कौशल प्रशिक्षण, स्वास्थ्य जागरूकता और वित्तीय साक्षरता सत्र"}</div>
            <div>{language==="en" ? "•  👨‍👩‍👧‍👦 Support for Orphanages & Senior Citizens" : "•  👨‍👩‍👧‍👦 अनाथालयों और वरिष्ठ नागरिकों के लिए सहायता"}</div>
            <div>{language==="en" ? "Monthly visits, donation drives, and companionship programs." : "मासिक दौरे, दान अभियान और साथ-साथ कार्यक्रम"}</div>
            <div>{language==="en" ? "•  🌱 Environmental Drives" : "•  🌱 पर्यावरण अभियान"}</div>
            <div>{language==="en" ? "Tree plantation, cleanliness campaigns, and awareness rallies for a greener future." : "हरित भविष्य के लिए वृक्षारोपण, स्वच्छता अभियान और जागरूकता रैलियाँ"}</div>
            <div>{language==="en" ? "•  🧠 Mental Health & Counseling Support" : "•  🧠 मानसिक स्वास्थ्य और परामर्श सहायता"}</div>
            <div>{language==="en" ? "Access to basic mental health guidance, especially for youth and elderly." : "मूलभूत मानसिक स्वास्थ्य मार्गदर्शन की सुविधा, विशेषकर युवाओं और बुजुर्गों के लिए"}</div>
            <div>{language==="en" ? "Samman Samaroh- for all deserving candidates in education and social welfare will be awarded." : "सम्मान समारोह - शिक्षा और सामाजिक कल्याण में सभी योग्य उम्मीदवारों को सम्मानित किया जाएगा।"}</div></div>
         <div className='bg-slate-600/70 m-[10px] h-[3px]  rounded-sm '>
        <br  />
       </div>
       <div className='pl-5'>
            <div className='text-center'>{language==="en" ? "3. Voluteers with us" : "3. हमारे साथ स्वयंसेवक बनें"}</div>
            <div>{language==="en" ? "How You Can Help:" : "आप कैसे मदद कर सकते हैं:"}</div>
            <div>{language==="en" ? "•  📚 Teach or mentor students (online or offline)" : "•  📚 छात्रों को पढ़ाएँ या मार्गदर्शन करें (ऑनलाइन या ऑफलाइन)"}</div>
            <div>{language==="en" ? "•  🩸 Assist in blood donation & health camps" : "•  🩸 रक्तदान और स्वास्थ्य शिविरों में सहायता करें"}</div>
            <div>{language==="en" ? "•  🌿 Participate in tree plantation & cleanliness drives" : "•  🌿 वृक्षारोपण और स्वच्छता अभियानों में भाग लें"}</div>
            <div>{language==="en" ? "•  👥 Help with event management or promotion" : "•  👥 कार्यक्रम प्रबंधन या प्रचार में सहायता करें"}</div>
            <div>{language==="en" ? "•  📸 Photography, videography, or social media support" : "•  📸 फोटोग्राफी, वीडियोग्राफी या सोशल मीडिया सहायता"}</div>
            <div>{language==="en" ? "•  💬 Spreading awareness in your local area" : "•  💬 अपने क्षेत्र में जागरूकता फैलाएँ"}</div>
            <div>{language==="en" ? "Why Volunteer With Lohar Samaj?" : "लोहार समाज के साथ स्वयंसेवक क्यों बनें?"}</div>
            <div>{language==="en" ? "•  Gain meaningful experience" : "•  सार्थक अनुभव प्राप्त करें"}</div>
            <div>{language==="en" ? "•  Meet like-minded changemakers" : "•  समान विचारधारा वाले परिवर्तनकर्ताओं से मिलें"}</div>
            <div>{language==="en" ? "•  Certificate of Contribution" : "•  योगदान प्रमाण पत्र"}</div>
            <div>{language==="en" ? "•  Serve your samaj and build your legacy" : "•  अपने समाज की सेवा करें और अपनी विरासत बनाएं"}</div></div>

          </div>
       </div>
  )
}

export default Para

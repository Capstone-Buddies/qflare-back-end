import { QuizQuestionType } from "../schema";
import { QuestionCategoryDummyType } from "./questionCategories";

const dummyId = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
] as const;

export type QuizQuestionDummyType = QuizQuestionType & {
  id: (typeof dummyId)[number];
  questionCategoryId: QuestionCategoryDummyType["id"];
  answer: 1 | 2 | 3 | 4;
};

export const quizQuestionsDummy: Omit<QuizQuestionDummyType, "id">[] = [
  {
    questionCategoryId: 1,
    question: "Lawan kata monoton",
    option1: "Bergerak-gerak",
    option2: "Berulang-ulang ",
    option3: "Berubah-ubah",
    option4: "Terus menerus",
    answer: 4,
  },
  {
    questionCategoryId: 1,
    question:
      "Semua pegawai negeri dapat berbahasa Inggris.\nBeberapa pegawai negeri yang menduduki jabatan eselon satu pandai berpidato dalam bahasa Belanda.",
    option1:
      "Semua pegawai negeri yang dapat berbahasa Betanda menduduki jabatan eselon satu.",
    option2:
      "Semua pegawai negeri yang mend udukijabatan eselon pasti dapat berbahasa Inggris.",
    option3:
      "Beberapa pegawai negeri yang dapat berbahasa Inggris pasti tidak menduduki jabatan eselon.",
    option4: "Semua pejabat dapat berbahasa Belanda.",
    answer: 3,
  },
  {
    questionCategoryId: 1,
    question:
      "Kadar gula yang tinggi dalam darah meningkatkan risiko penyakit kardiovaskular. Upaya untuk mencegah meningkatnya kadar gula dalam darah dapat dicegah dengan diet karbohidrat. Risiko terjadinya penyakit kardiovaskular dapat berkurang jika jumlah karbohidrat yang dikonsumsi dapat dikendalikan. Berdasarkan informasi tersebut, manakah pernyataan berikut yang PASTI BENAR?",
    option1:
      "Menerapkan diet karbohidrat dapat meningkatkan kadar gula dalam darah",
    option2: "Konsumsi karbohidrat dapat menurunkan kadar gula dalam darah",
    option3:
      "Risiko penyakit kardiovaskular berkurang jika diet karbohidrat diterapkan",
    option4:
      "Menerapkan diet karbohidrat masih memiliki risiko penyakit kardiovaskular",
    answer: 3,
  },
  {
    questionCategoryId: 3,
    question:
      "Measles, a childhood disease, has caused suffering to mankind for thousands of years. However, the search for an effective measles vaccine lasted two hundred years and has finally ended in success. Now, for the first time, measles is a preventable disease. You may ask, ”How is this important to children?” Every year measles kills twice as many Americans as polio does. More children die from measles than from any other common childhood disease. Also complications of some degree occur in about one child out of six. Most complication include pneumonia and ear disorders. Another after-effect of measles-brain damage is less common, but it can have such serious consequence that it deserves special attention. Brain damage due to measles sounds like something far away from our experience. In reality, it is not. Like other injury, damage to the brain can be very slight or very severe. It is quite possible that we have never seen or heard a child who has severe brain damage – the child would either have died or would be in an institution. However, in medical research a relation has been found between measles and such things as behavior problems, personality changes and dulling of metal ability. For example, a child may be bad-tempered or a little slow to learn after he has recovered from measles. One of the important findings of the research on measles is that ….",
    option1:
      "Children who have got measles may become difficult to handle because of their behavior.",
    option2: "In reality, there are no measles patients who get brain damage.",
    option3:
      "Personality changes already occur at the time a child has measles.",
    option4: "Measles can cause children to become physically handicapped",
    answer: 1,
  },
  {
    questionCategoryId: 3,
    question:
      "(1) Para anggota Quora asal Indonesia pun berlomba-lomba menjawab pertanyaan tersebut. (2) Salah satu pengguna Quora yang bernama Dio Wijayanto Nugroho menuturkan bahwa kata wkwk lahir di komunitas game online. (3) Penggunaan kata haha dianggap sangat formal di dunia game. (4) Pemain lebih memilih untuk menggunakan kata huehue dan huahua untuk ekspresi tertawa. (5) Nah, sama seperti gua menjadi gw, huruf U yang ada di huehue dan huahua diubah menjadi W sehingga pemain memilih menggunakan kata hwhwhw. (6) Kemudian, kata itu berubah lagi menjadi wkwk dengan alasan lebih mudah diketik dibandingkan haha. (7) Pemain game online bisa mengetikkan huruf W tanpa menggerakkan tangan kiri, sedangkan huruf K bisa diketik tanpa menggerakkan tangan kanan.\n\nKalimat yang bebas dari kesalahan penulisan adalah",
    option1: "2",
    option2: "4",
    option3: "5",
    option4: "6",
    answer: 3,
  },
  {
    questionCategoryId: 3,
    question:
      "Dalam pertandingan bulu tangkis Daniel selalu kalah melawan Wisnu, tetapi dalam cabang olahraga yang lainnya ia selalu menang bila bertanding melawan Wisnu. Putra selalu menang dalam pertandingan tenis meja melawan Wisnu, tetapi dalam cabang bulu tangkis ia akan kalah bila bertanding melawan Daniel. Reza adalah pemain bulu tangkis terbaik, tetapi dalam cabang tenis meja dia tidak sebaik Wisnu. Dalam cabang tenis meja, Aldian lebih baik daripada Daniel, sedangkan dalam cabang bulu tangkis ia menempati urutan tepat di bawah Reza.\n\nUntuk cabang olahraga tenis meja, ranking pemain terbaik yang manakah yang paling tepat dari urutan di bawah ini",
    option1: "Wisnu – Daniel – Putra – Reza – Aldian",
    option2: "Aldian – Daniel – Putra – Wisnu – Reza",
    option3: "Daniel – Wisnu – Putra – Aldian – Reza",
    option4: "Reza – Aldian – Putra – Wisnu – Daniel",
    answer: 2,
  },
  {
    questionCategoryId: 2,
    question:
      "(1) Sebagian besar orang sering mengeluh karena terlalu sibuk. (2) Mereka umumnya ingin memiliki lebih banyak waktu luang. (3) Namun, penelitian terbaru menemukan bahwa terlalu banyak waktu luang ternyata tidak lebih baik daripada terlalu sibuk. (4) Menurut penelitian yang diterbitkan oleh American Psychological Association, bertambahnya waktu luang memang dapat meningkatkan rasa bahagia. (5) Akan tetapi, perasaan itu hanya bertahan sampai titik tertentu. (6) Jika waktu luang yang dimiliki terlalu banyak, akan ada dampak buruk yang timbul.\n(7) Untuk menyelidiki fenomena tersebut, para peneliti melakukan eksperimen daring yang melibatkan lebih dari 6.000 peserta. (8) Peneliti menemukan bahwa orang yang memiliki waktu luang sedikit merasa lebih stres daripada mereka yang memiliki jumlah waktu luang sedang. (9) Sementara itu, mereka yang memiliki waktu luang banyak juga merasa kurang produktif daripada mereka yang berada dalam kelompok sedang. (10) Lebih lanjut, temuan tersebut menunjukkan bahwa berakhir dengan waktu luang sepanjang hari untuk melakukan hal-hal yang diinginkan ternyata dapat membuat seseorang merasa tidak bahagia. (11) Sebaliknya, orang harus berusaha untuk memiliki waktu luang dalam jumlah sedang agar dapat melakukan apa yang mereka inginkan.\n\nTopik bacaan tersebut adalah ....",
    option1:
      "Perbandingan antara orang yang memiliki waktu luang dengan orang yang sibuk",
    option2:
      "Kelebihan dan kekurangan dari adanya waktu luang yang terlalu banyak",
    option3:
      "Memiliki terlalu banyak waktu luang tidak lebih baik daripada terlalu sibuk",
    option4:
      "Dampak buruk yang dialami oleh orang-orang yang memiliki waktu luang",
    answer: 3,
  },
  {
    questionCategoryId: 2,
    question:
      "(1) Sebagian besar orang sering mengeluh karena terlalu sibuk. (2) Mereka umumnya ingin memiliki lebih banyak waktu luang. (3) Namun, penelitian terbaru menemukan bahwa terlalu banyak waktu luang ternyata tidak lebih baik daripada terlalu sibuk. (4) Menurut penelitian yang diterbitkan oleh American Psychological Association, bertambahnya waktu luang memang dapat meningkatkan rasa bahagia. (5) Akan tetapi, perasaan itu hanya bertahan sampai titik tertentu. (6) Jika waktu luang yang dimiliki terlalu banyak, akan ada dampak buruk yang timbul. (7) Untuk menyelidiki fenomena tersebut, para peneliti melakukan eksperimen daring yang melibatkan lebih dari 6.000 peserta. (8) Peneliti menemukan bahwa orang yang memiliki waktu luang sedikit merasa lebih stres daripada mereka yang memiliki jumlah waktu luang sedang. (9) Sementara itu, mereka yang memiliki waktu luang banyak juga merasa kurang produktif daripada mereka yang berada dalam kelompok sedang. (10) Lebih lanjut, temuan tersebut menunjukkan bahwa berakhir dengan waktu luang sepanjang hari untuk melakukan hal-hal yang diinginkan ternyata dapat membuat seseorang merasa tidak bahagia. (11) Sebaliknya, orang harus berusaha untuk memiliki waktu luang dalam jumlah sedang agar dapat melakukan apa yang mereka inginkan.\n\nMakna yang sama dari kata dampak pada kalimat (6) terdapat pula pada kata ....",
    option1: "Impak",
    option2: "Efek",
    option3: "Imbas",
    option4: "Akibat",
    answer: 1,
  },
  {
    questionCategoryId: 2,
    question:
      "Akibatnya Indonesia tidak bisa membeli persenjataan dari Amerika serikat. Selain itu, Indonesia juga tidak bisa membeli suku cadang untuk perawatan peralatan dari Amerika Serikat. Sebagai contoh, dari belasan pesawat Hercules yang dimiliki Indonesia hanya kurang dari lima pesawat saja yang bisa digunakan.\n\nUntuk melengkapi paragraf tersebut menjadi paragraf deduktif, kalimat utama yang tepat adalah..",
    option1:
      "Amerika Serikat siap mencabut embargo militer terhadap Indonesia.",
    option2:
      "Pencabutan embargo militer terhadap Indonesia disebabkan maraknya aktivitas terorisme di Indonesia",
    option3:
      "Amerika Serikat mengenakan embargo senjata pada Indonesia karena banyak warganya menjadi korban pemboman di Indonesia.",
    option4:
      "Presiden Amerika Serikat akan mencabut embargo militer terhadap pemerintah Indonesia.",
    answer: 3,
  },
  {
    questionCategoryId: 4,
    question:
      "Apabila x adalah luas bujur-sangkar yang panjang sisinya 10 cm dan y adalah luas lingkaran yang garis tengahnya 10 cm. Maka",
    option1: "x > y",
    option2: "x = y",
    option3: "x < y",
    option4: "Hubungan antara x dan y tidak dapat ditentukan",
    answer: 1,
  },
  {
    questionCategoryId: 5,
    question:
      'Untuk kali pertama, ilmuwan telah menemukan bukti fisik opal di Mars. Jejak yang terdapat pada batu sebelumnya yang ditemukan di dalam meteorit Mars dapat membantu misi eksplorasi di masa depan untuk menentukan wilayah yang mungkin menyimpan bukti adanya tanda-tanda kehidupan di planet Merah tersebut. Opal itu ditemukan dalam pecahan meteorit Nakhla seberat 1,7 gram, meteorit yang dipasok oleh Natural History Museum di London. Meteorit Nakhla sendiri jatuh di Nakhla, Mesir, pada tahun 1911. Tim peneliti yang berasal dari University of Glasgow mengidentifikasi ciri dari batu permata itu sebagai batu permata berwarna oranye terang, kuning, dan merah. Profesor Martin Lee selaku ketua penelitian ini menjelaskan bahwa penemuan batu opal ini sangat penting bagi perkembangan penelitian Mars. "Ini kali pertama ada benda dari Mars di Bumi yang mengandung opal," jelasnya kepada phys.org. Penemuan batu opal asal Mars diklaim sebagai pencapaian besar. Itu terjadi karena batu opal diketahui bisa menyimpan fosil makhluk hidup dan biasa terbentuk di sekitar sumber air panas yang digemari mikroba. Layaknya di Bumi, batu opal terbentuk di sekitar sumber air panas. Dalam situasi itu, akan hidup mikroba. Batuan opal biasanya menangkap dan mengurung mikroba selama jutaan. tahun. "Jika memang ada mikroba di Mars, bisa jadi mereka terperangkap di dalam batu opal ini," harap Lee. Dikutip dari: nationalgeographic.grid.id\nBerdasarkan bacaan tersebut, apa fakta yang disorot oleh Martin Lee?',
    option1: "Adanya kehidupan mikroba di dalam opal. ",
    option2: "Keberadaan opal menunjukkan adanya tanda-tanda makhluk hidup. ",
    option3:
      "Penemuan opal dari meteorit Mars yang ada di Bumi untuk pertama kali.",
    option4: "Keberadaan opal di Mara untuk pertama kali. ",
    answer: 3,
  },
  {
    questionCategoryId: 5,
    question:
      '(1) Film "Penyalin Cahaya" berhasil memboyong penghargaan tertinggi Malam Anugerah Piala Citra Festival Film Indonesia (FFI) 2021 sebagai Film Cerita Panjang Terbaik. (2) "Penyalin Cahaya" juga menjadi juara umum dalam Festival Film Indonesia (FFI) 2021 dengan mengumpulkan 12 Piala Citra dari 17 nominasi yang diterima. (3) Dalam kategori tersebut, "Penyalin Cahaya" berhasil mengalahkan "Ali & Ratu Ratu Queens". (4) Kemenangan film ini dibacakan oleh Mendikbudristek RI, Nadiem Makarim. (5) Sebelumnya, sutradara Wregas Bhanuteja mendedikasikan film "Penyalin Cahaya" sebagai media untuk mengungkapkan isu kekerasan seksual yang selama ini ditutup-tutupi masyarakat Indonesia. (6) la memandang film adalah sarana komunikasi yang paling efisien untuk menyuarakan sebuah kegelisahan yang sedang terjadi di masyarakat. (7) Salah satunya isu kekerasan seksual yang menjadi tema dalam film "Penyalin Cahaya". 88 Menurutnya, banyak sekali penyintas yang tidak mendapat keadilan.\nKelemahan teks di atas adalah',
    option1:
      "Teks tidak mengungkapkan kaitan antara sutradara dan Festival Film Indonesia 2021",
    option2:
      'Teks tidak menyajikan data penghargaan yang didapat film "Penyalin Cahaya".',
    option3:
      'Teks tidak menyebutkan waktu dan lokasi peluncuran film "Penyalin Cahaya". ',
    option4:
      'Terbatasnya informasi mengenai tujuan produksi film "Penyalin Cahaya" ',
    answer: 1,
  },
  {
    questionCategoryId: 5,
    question:
      "Bersama dengan datangnya pagi maka air laut di tepi pantai itu segera menjadi hijau. Hayati yang biasa memikul air sejak subuh, sambil menuruni tebing bisa melihat bebatuan di dasar pantai yang tampak kabur di bawah permukaan air laut yang hijau itu. Cahaya keemasan matahari pagi menyapu pantai, membuat pasir yang basah berkilat keemasan setiap kali lidah ombak kembali surut ke laut. Onggokan batu karang yang kadang-kadang menyerupai perahu tetap teronggok sejak semalam, sejak bertahun, sejak beribu-ribu tahun yang lalu. Bukankah memang perlu waktu jutaan tahun bagi angin untuk membentuk dinding karang menjadi onggokan batu yang mirip dengan sebuah perahu. Para nelayan memang hanya tahu perahu. Bulan sabit mereka hubungkan dengan perahu, gugusan bintang mereka hubung-hubungkan dengan cadik penyeimbang perahu, seolah-olah angkasa raya adalah ruang pelayaran bagi perahu-perahu seperti yang mereka miliki, bahkan atap rumah-rumah mereka dibuat seperti ujung-ujung perahu. Tentu, bagaimana mungkin kehidupan para nelayan dilepaskan dari perahu? Hayati masih terus menuruni tebing setengah berlari dengan pikulan air pada bahunya. Kakinya yang telanjang bagaikan mempunyai alat perekat, melangkah di atas batu-batu hitam berlumut. tanpa pernah terpeleset sama sekali, sekaligus bagaikan terlapis karet atau plastik alas sepatu karena seolah tidak berasa sedikit pun juga ketika menapak di atas batu-batu karang yang tajam tiada berperi. Cerpen Cinta di Atas Perahu Cadik karya Seno Gumira Ajidarma\nMaksud dari kalimat Cahaya keemasan matahari pagi menyapu pantai di paragraf 1 adalah ... ",
    option1: "Matahari bersinar sangat terik. ",
    option2: "Cahaya matahari lebih terang dari biasanya. ",
    option3: "Matahari mulai menyinari semua wilayah pantai.",
    option4: "Matahari membuat sampah pantai mengering dan pantai bersih. ",
    answer: 3,
  },
  {
    questionCategoryId: 6,
    question:
      'TEXT A - Berlin (Reuters)-No more Coca-Cola or Budweiser, no Marlboro, no American whiskey or even American Express cards a growing number of restaurants in Germany are taking everything American off their menus to protest the war in Iraq. Although the protests are mainly symbolic, waiters in dozens of bars and restaurants in Hamburg, Berlin, Munich, Bonn and other German cities are telling patrons, "Sorry, Coca-Cola is not available any more due to the current political situation." The boycotts appear to be part of a nascent worldwide movement. One Web site, www.consumers-against-war.de, calls for boycotts of 27 top American firms from Microsoft to Kodak while another, www.adbusters.org, urges the "millions of people against the war" to "Boycott Brand America." Consumer fury seems to be on the rise. Demonstrators in Paris smashed the windows of a McDonald\'s restaurant last week, forcing police in riot gear to move in to protect staff and customers of the American fast-food outlet. The attackers sprayed obscenities and "boycott" on the windows. TEXT B This economic advantage, in turn, is used to sponsor terror and killing in Islamic countries such as Afghanistan and Iraq. When product boycott was carried out by consumers in the Middle East and some in the European countries, sales of these companies is reported to be decreased by 10% and this amounted to big numbers for giant companies. Thus, it is a rational for Muslim especially in Malaysia to take similar action. Furthermore, Of late, many other products are available as an alternative for the boycotted products. For example, we have Mukmin toothpaste instead of Colgate etc. and Fab or Breeze could be replaced with Daiya, Puteri Emas etc. There are a few questions arise in regard to the boycott such as how effective is the approach and why not boycotting all the products altogether. In answering these questions, Sabasun has reiterated to look at collapse of the apartheid regime in South Africa as the best example. To answer the question in regard to why not boycotting all the products altogether, Sabasun has taken an approach to do what can be done when one cannot do all. Hence, a few products that are really needed by consumers are offered on a limited floor space and no promotion is done for the product. While products that are boycott completely will not even get space on the shelves let alone floor space. During the early phase after the campaign was in progress, the effect of the boycott is very obvious when Sabasun suffer a loss of nearly RM 150,000.\nBoth passages are similar in terms of ',
    option1: "The problem underlying in both passages",
    option2: "The writer's point of view ",
    option3: "The effect of the problem discussed ",
    option4: "The area the problem taking place ",
    answer: 1,
  },
  {
    questionCategoryId: 6,
    question:
      "Two types of trees from the same family of trees share honors in certain respects as the most impressive of trees. Both evergreen conifers, the California redwood (Sequoia sempervirens) and the giant sequoia (Sequoiandendron giganteum) are found growing natively only in the stage of California. The california redwood is found along the northern coast of the state, while the giant sequoia is found inland and at higher elevations, along the western slopes of the Sierra Nevadas. The California redwood is the tallest living tree and is in fact the tallest living thing on the face of the earth; The height of the tallest redwood on record is 385 feet (120 meters). Though not quite as tall as the California redwood, with a height of 320 feet (100 meters), the giant sequoia is nonetheless the largest and most massive of living things; giant sequoias have been measured at more than 100 feet (30 meters) around the base, with weights of more than 6000 tons.\nIt can be inferred from the passage that the Sierra Nevadas are",
    option1: "A Type of giant redwood ",
    option2: "A coastal community ",
    option3: "A group of lakes ",
    option4: "A mountain ranges ",
    answer: 4,
  },
  {
    questionCategoryId: 6,
    question:
      "Some Indonesians may miss something when their meal does not come up with chilies or chili chunks. The hottest ones are the most sought after by chili lovers. Not just spicy, chilies turn out to contain some important nutrients such as energy, carbohydrates, sugar, fiber, fat, protein, vitamin A, vitamin B6, vitamin C, iron, magnesium, potassium, water, and capsaicin. Capsaicin is what makes chili taste spicy and hot. Despite its spicy taste, chilies turn out to have many health benefits. The first benefit of chilies is for stomach health. Capsaicin in chilies can nourish the digestion by increasing the digestive juices in the stomach and fighting bacteria that cause infection. In addition, chilies also help fight diarrhea caused by bacterial infections. Chilies can also reduce pain. Applying an ointment or cream containing capsaicin is thought to help reduce soreness, pain after surgery, migraines, psoriasis, thrush due to chemotherapy or radiation, joint problems such as rheumatoid arthritis and osteoarthritis, nervous system problems such as diabetic neuropathy, sudden and sharp pain in one side of the face, and nerve pain the area of the body infected with chickenpox virus. In addition, capsaicin is also thought to reduce back pain, muscle and soft tissue pain in fibromyalgia, relieve symptoms of prurigo nodularis skin disease, and relieve symptoms of runny noses that are not associated with allergies or infections. Capsaicin works by first stimulating and then reducing the intensity of pain in the body. That is why when applying a cream containing capsaicin, we will feel the pain, but the pain will usually subside after the first use. The other benefit of chilies is that they are believed to be able to strengthen lung tissues and help prevent or treat chronic lung diseases where the small air sacs in the lungs are damaged by smoking. In addition, chilies also thin the mucus in the lungs so that it can be easily removed from the lungs. According to research in China, a long term consumption or capsaicin is thought to reduce blood pressure levels. In addition, other studies also reveal that capsaicin is thought to reducecholesterol and prevent blood clots causing heart disease.\nIn which paragraph does the writer emphasize the benefits of chilies for the respiratory tract? ",
    option1: "1",
    option2: "2",
    option3: "3",
    option4: "4",
    answer: 4,
  },
  {
    questionCategoryId: 7,
    question:
      "Diketahui dua buah bilangan yaitu 1/6 dan 1/8. Bilangan yang harus ditambahkan sehingga didapat rata-rata yaitu 1/6 adalah",
    option1: "5/12",
    option2: "5/24",
    option3: "1/4",
    option4: "24/5",
    answer: 2,
  },
  {
    questionCategoryId: 7,
    question:
      "Diketahui pada suatu seleksi calon karyawan terdapat 3 orang pria dan 4 orang wanita yang duduk secara melingkar. Dalam seleksi tersebut, mereka wajib mengerjakan 8 soal dari 12 soal tes yang diberikan dan akan dipilih 3 orang yang lolos seleksi sebagai karyawan. Berdasarkan informasi tersebut, manakah di antara pilihan berikut yang bernilai benar?\n1. Banyak cara duduk calon karyawan tersebut adalah 210 cara.\n2. Jika 5 soal pertama wajib dikerjakan, banyak kemungkinan pilihan soal yang dikerjakan dari setiap calon karyawan adalah 120 cara.\n3. Banyak kemungkinan variasi peserta yang lolos seleksi adalah 70.\n4. Banyak kemungkinan jika seorang pria dan 2 orang wanita yang lolos seleksi adalah 18.",
    option1: "1, 2, dan 3 SAJA yang benar.",
    option2: "1 dan 3 SAJA yang benar.",
    option3: "2 dan 4 SAJA yang benar.",
    option4: "HANYA 4 yang benar.",
    answer: 4,
  },
  {
    questionCategoryId: 7,
    question:
      "Andre, Sansa, dan Banu memiliki sejumlah mata pelajaran favorit yang saling beririsansatu sama lain. Andre menyukai 8 mata pelajaran, Sansa menyukai 9 mata pelajaran, danBanu menyukai 10 mata pelajaran. Banu tidak menyukai 2 mata pelajaran favorit Andre danSansa, tetapi Banu menyukai 3 mata pelajaran favorit Sansa. Kemudian, sebanyak 2 matapelajaran hanya disukai oleh Andre. Jika tidak ada mata pelajaran yang sama sekali tidakdisukai ketiganya, maka berapa banyak mata pelajaran favorit Banu dan Sansa yang bukanmata pelajaran favorit Andre?\n\nPutuskan apakah pernyataan 1 dan 2 berikut cukup untuk menjawab pertanyaan tersebut.\nBanyaknya mata pelajaran favorit ketiganya adalah 1.\nBanyaknya mata pelajaran favorit Andre yang bukan mata pelajaran favorit Banu adalah 4.",
    option1:
      "Pernyataan 1 SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan 2 SAJA tidak cukup.",
    option2:
      "Pernyataan 2 SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan 1 SAJA tidak cukup.",
    option3:
      "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup.",
    option4:
      "Pernyataan 1 SAJA cukup untuk menjawab pertanyaan dan pernyataan 2 SAJA cukup.",
    answer: 1,
  },
  {
    questionCategoryId: 7,
    question:
      "Dalam suatu gedung teater di Provinsi Suka-Suka terdapat 11 baris kursi. Baris pertama berisi 10 kursi, baris kedua berisi 15 kursi, baris ketiga berisi 17 kursi, baris keempat berisi 22 kursi, baris ke lima berisi 24 kursi, dan seterusnya mengikuti pola yang sama. Apabila dalam suatu pertunjukan teater hanya terisi setengah dari total kapasitas gedung dan harga tiket pertunjukan adalah Rp30.000,00 per orang, total pendapatan dari pertunjukan tersebut adalah",
    option1: "Rp9.300.000,00",
    option2: "RP6.975.000,00",
    option3: "Rp4.650.000,00",
    option4: "Rp3.650.000,00",
    answer: 3,
  },
];

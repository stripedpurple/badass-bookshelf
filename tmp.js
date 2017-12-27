let db = require('level')('/opt/dev/db/bookshelfdb');
let books = [];

// generates uuid https://gist.github.com/jed/982883
function b(a) {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b)
}

let tmpBooks = [
    {
        title: "College Algebra",
        author: "Raymond Barnett | Michael Ziegler | Karl Byleen | David Sobecki",
        publisher: "McGraw-Hill",
        cover: "http://imgur.com/LLwdo4V.png",
        isbn_13: "978-0073519494",
        isbn_10: "0073519499",
        edition: "9th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Raymond+A.+Barnett+College+Algebra%2C+9th+Edition++2010.pdf"
    },
    {
        title: "Data Structures & Algorithims Using C#",
        author: " Michael McMillan",
        publisher: "Cambridge U Press",
        cover: "http://imgur.com/MT5VwGi.png",
        isbn_13: "978-0521670159",
        isbn_10: "0521670152",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Cambridge.University.Press.Data.Structures.and.Algorithms.Using.CSharp.Mar.2007.pdf"
    },
    {
        title: " Discrete Mathematics and Its Applications",
        author: "Kenneth Rosen",
        publisher: "McGraw-Hill Education",
        cover: "http://imgur.com/vgw0pOk.png",
        isbn_13: "978-0073383095",
        isbn_10: "0073383090",
        edition: "7th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/McGraw.Hill.Discrete.Mathematics.and.Its.Applications.7th.Edition.Jun.2011.pdf"
    },
    {
        title: " Operating System Concepts",
        author: "Abraham Silberschatz | Peter B. Galvin | Greg Gagne",
        publisher: "Wiley",
        cover: "http://imgur.com/hxqrtVC.png",
        isbn_13: "978-0470128725",
        isbn_10: "0470128720",
        edition: "8th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Operating+System+Concepts+8th+Edition.pdf"
    },
    {
        title: " Physics for Scientists and Engineers: A Strategic Approach with Modern Physics",
        author: "Randall D. Knight",
        publisher: "Addison-Wesley",
        cover: "http://imgur.com/X80M52H.png",
        isbn_13: "978-0321740908",
        isbn_10: "0321740904",
        edition: "3rd",
        download: "https://s3-us-west-1.amazonaws.com/f-society/physics+sci+eng+knight+3rd+edition.pdf"
    },
    {
        title: "Principles Of Computer Security",
        author: " Wm. Arthur Conklin | Gregory White | Dwayne Williams | Roger Davis | Chuck Cothren | Corey Schou",
        publisher: "Willey",
        cover: "http://imgur.com/A4mBYDj.png",
        isbn_13: "978-0071633758",
        isbn_10: "0071633758",
        edition: "2nd",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Principles+of+Computer+Security-+CompTIA+SecurityPlusTM+and+Beyond.pdf"
    },
    {
        title: "Public Speaking: Finding Your Voice",
        author: "Michael Osborn",
        publisher: "Pearson",
        cover: "http://imgur.com/Apjpz4o.png",
        isbn_13: "978-0205778447",
        isbn_10: "0205778445",
        edition: "9th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Public+Speaking%2C+Finding+Your+Voice%2C+Ninth+Edition-+Michael+Osborn.pdf"
    },
    {
        title: " Python Forensics",
        author: "Chet Hosmer",
        publisher: "Syngress",
        cover: "http://imgur.com/VGoF3n7.png",
        isbn_13: "978-0124186767",
        isbn_10: "0124186769",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Python+Forensics+-+Hosmer%2C+Chet.pdf"
    },
    {
        title: " Security in Computing",
        author: "Charles P. Pfleeger",
        publisher: "Prentice Hall",
        cover: "http://i.imgur.com/CWiNfSz.jpg",
        isbn_13: "978-0134085043",
        isbn_10: "0134085043",
        edition: "5th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Prentice.Hall.Security.in.Computing.5th.Edition.0134085043+_+r.pdf"
    },
    {
        title: " Technical Communication",
        author: "Mike Markel",
        publisher: "Bedford/St. Martin's",
        cover: "http://imgur.com/sDJuzwh.png",
        isbn_13: "978-1457673375",
        isbn_10: "1457673371",
        edition: "11th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Technical+Communication+(11th+Ed)_reduced.pdf"
    },
    {
        title: " Brief Principles of Macroeconomics",
        author: " N. Gregory Mankiw",
        publisher: "South-Western College Pub",
        cover: "http://imgur.com/BisTwGY.png",
        isbn_13: "978-0538453073",
        isbn_10: "0538453079",
        edition: "6th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Brief+Principles+of+Macroeconomics%2C+6th+ed.pdf"
    },
    {
        title: "Python Programming: An Introduction to Computer Science, 2nd Ed.",
        author: "John Zelle",
        publisher: "Franklin, Beedle &amp; Associates Inc.",
        cover: "http://imgur.com/v6oIfas.png",
        isbn_13: "978-1590282410",
        isbn_10: "1590282418",
        edition: "2nd",
        download: "https://s3-us-west-1.amazonaws.com/f-society/John+Zelle-Python+Programming_+An+Introduction+to+Computer+Science-Franklin%2C+Beedle+%26+Associates+(2009).pdf"
    },
    {
        title: " McGraw-Hill's Taxation of Individuals and Business Entities, 2016 Edition",
        author: "Brian Spilker | Benjamin Ayers | John Robinson | Edmund Outslay | Ronald Worsham | John Barrick | Connie Weaver",
        publisher: "McGraw-Hill Education",
        cover: "http://imgur.com/oP1EM55.png",
        isbn_13: "978-1259334870",
        isbn_10: "1259334872",
        edition: "7th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/McgTaxOfIndAndBusEnt201Edi.pdf"
    },
    {
        title: "The Sciences - An Integrated Approach",
        author: "James Trefil | Robert M. Hazen",
        publisher: "Wiley",
        cover: "http://i.imgur.com/qcs21i9.jpg",
        isbn_13: "978-1118185261",
        isbn_10: "1118185269",
        edition: "7th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/sciences-integrated-approach-7th-edition_v2.pdf"
    },
    {
        title: "Artificial Intelligence - Structures and Strategies for Complex Problem Solving",
        author: "George F. Luger",
        publisher: "Pearson",
        cover: "http://i.imgur.com/yDieQW2.jpg",
        isbn_13: "978-0321545893",
        isbn_10: "0321545893",
        edition: "6th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Artificial+Intillegence+(6th+Edition)+By+George+F+Luger.pdf"
    },
    {
        title: "Software Engineering",
        author: "Ian Sommerville",
        publisher: "Pearson",
        cover: "http://i.imgur.com/JAJPSxH.jpg",
        isbn_13: "978-0137035151",
        isbn_10: "0137035152",
        edition: "9th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Ian+Sommerville-Software+engineering-Pearson++(2011).pdf"
    },
    {
        title: "Database Systems - Design, Implementation, and Management",
        author: "Carlos Coronel | Steven Morris",
        publisher: "Course Technology",
        cover: "http://i.imgur.com/rNu60Tn.jpg",
        isbn_13: "978-1285196145",
        isbn_10: "1285196147",
        edition: "11th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Database+Systems+Design%2C+Implementation%2C+%26+Management%2C+11th+Edition.pdf"
    },
    {
        title: "Database Processing: Fundamentals, Design, and Implementation",
        author: "David M. Kroenke | David J. Auer",
        publisher: "Pearson",
        cover: "http://i.imgur.com/pMYZhNh.jpg",
        isbn_13: "US Edition 978-0133876703 | Global Edition 978-1292107639",
        isbn_10: "0133876705 | Global Edition 1292107634",
        edition: "14th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Pearson.Database.Processing.Fundamentals.Design.and.Implementation.14th.Edition.1292107634.pdf"
    },
    {
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell | Peter Norvig",
        publisher: "Pearson",
        cover: "http://i.imgur.com/Fep0QsJ.jpg",
        isbn_13: "978-0136042594",
        isbn_10: "0136042597",
        edition: "3rd",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Prentice.Artificial.Intelligence.A.Modern.Approach.3rd.Edition.0136042597.pdf"
    },
    {
        title: "Chemistry: Structure and Properties",
        author: " Nivaldo J. Tro",
        publisher: "Pearson",
        cover: "http://i.imgur.com/lNmGfAs.png",
        isbn_13: "978-0321834683",
        isbn_10: "0321834682",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Nivaldo+J.+Tro-Chemistry_+Structure+and+Properties-Pearson+Education+(Prentice+Hall)+(c2015).pdf"
    },
    {
        title: "Decision Support and Business Intelligence Systems",
        author: "Efraim Turban | Ramesh E Sharda | Dursun Delen",
        publisher: "",
        cover: "http://i.imgur.com/T0twLn3.jpg",
        isbn_13: "978-0136107293",
        isbn_10: "013610729X",
        edition: "9th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Decision+Support+and+Business+Intelligence+Systems+9th+Ed+Efraim+Turban+-+r.pdf"
    },
    {
        title: "Exploring Psychology",
        author: "David G. Myers",
        publisher: "Worth Publishers",
        cover: "http://i.imgur.com/YcuqLjE.jpg",
        isbn_13: "978-1464111723",
        isbn_10: "1464111723",
        edition: "9th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Exploring+Psychology+(1).pdf"
    },
    {
        title: "The Hacker Playbook 2",
        author: "Peter Kim",
        publisher: "CreateSpace Independent Publishing Platform",
        cover: "http://i.imgur.com/LgkkWpr.jpg",
        isbn_13: "978-1512214567",
        isbn_10: "1512214566",
        edition: "2nd",
        "download_epub": "https://s3-us-west-1.amazonaws.com/f-society/CreateSpace.The.Hacker.Playbook.2.Practical.Guide.To.Penetration.Testing.1512214566.epub",
        "download_mobi": "https://s3-us-west-1.amazonaws.com/f-society/CreateSpace.The.Hacker.Playbook.2.Practical.Guide.To.Penetration.Testing.1512214566.mobi"
    },
    {
        title: "Hacking: The Art of Exploitation, 2nd Edition",
        author: "Jon Erickson",
        publisher: "No Starch Press",
        cover: "http://i.imgur.com/MfXd7TY.jpg",
        isbn_13: "978-1593271442",
        isbn_10: "1593271441",
        edition: "2nd",
        "download_pdf": "https://s3-us-west-1.amazonaws.com/f-society/No.Starch.Press.Hacking.The.Art.of.Exploitation.2nd.Edition.1593271441.pdf",
        "download_mobi": "https://s3-us-west-1.amazonaws.com/f-society/No.Starch.Press.Hacking.The.Art.of.Exploitation.2nd.Edition.1593271441.mobi",
        "download_epub": "https://s3-us-west-1.amazonaws.com/f-society/No.Starch.Press.Hacking.The.Art.of.Exploitation.2nd.Edition.1593271441.epub"
    },
    {
        title: "Rtfm: Red Team Field Manual",
        author: "Ben Clark",
        publisher: "CreateSpace Independent Publishing Platform",
        cover: "http://i.imgur.com/4WmJYdn.jpg",
        isbn_13: "978-1494295509",
        isbn_10: "1494295504",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Red.Team.Field.Manual.Feb.2014.pdf"
    },
    {
        title: "Essential Calculus: Early Transcendental Functions",
        author: "Ron Larson | Robert P. Hostetler | Bruce H. Edwards",
        publisher: "Cengage Learning",
        cover: "http://i.imgur.com/WkjbRJs.png",
        isbn_13: "978-0618879182",
        isbn_10: "0618879188",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Ron+Larson%2C+Robert+Hostetler%2C+Bruce+H.+Edwards-Essential+Calculus_+Early+Transcendental+Functions-Cengage+Learning+(2007).pdf"
    },
    {
        title: "Visual C# 2012 How to Program",
        author: "Paul Deitel",
        publisher: "Pearson",
        cover: "http://i.imgur.com/2BG8QOx.png",
        isbn_13: "978-0133379334",
        isbn_10: "0133379337",
        edition: "5th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Visual+C%23+2012+-+How+to+Program+-+Deitel+5th+ed.pdf"
    },
    {
        title: "Wireless Network Security A Beginner's Guide (Beginners Guide)",
        author: "Tyler Wrightson",
        publisher: "McGraw-Hill Education",
        cover: "http://i.imgur.com/ErQTbZk.jpg",
        isbn_13: "978-0071760942",
        isbn_10: "0071760946",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Wireless+Network+Security+A+Beginner-s+Guide.pdf"
    },
    {
        title: "Carbon Democracy: Political Power in the Age of Oil",
        author: "Timothy Mitchell",
        publisher: "Verso",
        cover: "http://i.imgur.com/jpcUhmh.png",
        isbn_13: "978-1781681169 | 978-1844677450",
        isbn_10: "1781681163 | 1844677451",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Timothy-Mitchell-Carbon-Democracy_-Political-Power-in-the-Age-of-Oil-Verso-2011.pdf"
    },
    {
        title: "For Cause and Comrades: Why Men Fought in the Civil War",
        author: "James M. McPherson",
        publisher: "Oxford University Press",
        cover: "http://i.imgur.com/GbipagS.png",
        isbn_13: "978-0195124996",
        isbn_10: "0195124995",
        edition: "reprint",
        download: "https://s3-us-west-1.amazonaws.com/f-society/For-Cause-and-Comrades-Why-Men-Fought-in-the-Civil-War.pdf"
    },
    {
        title: "The Fundamentals of Interactive Design",
        author: "Michael Salmond | Gavin Ambrose",
        publisher: "Fairchild Books",
        cover: "http://i.imgur.com/TGWaQBu.png",
        isbn_13: "978-2940411863",
        isbn_10: "2940411867",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/FundamentalsofInteractiveDesign.pdf"
    },
    {
        title: "Hard Times",
        author: "Studs Terkel",
        publisher: "New Press",
        cover: "http://i.imgur.com/t1LKVoz.png",
        isbn_13: "978-1595587602",
        isbn_10: "",
        edition: "Digital",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Hard-Times_Studs-Terkel.pdf"
    },
    {
        title: "HTML and CSS: Design and Build Websites",
        author: "Jon Duckett",
        publisher: "John Wiley & Sons",
        cover: "http://i.imgur.com/mF78hoz.png",
        isbn_13: "978-1118008188",
        isbn_10: "1118008189",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/HTML+and+CSS-+Design+and+Build+Websites+-duckett.pdf"
    },
    {
        title: "JavaScript and JQuery: Interactive Front-End Web Development",
        author: "Jon Duckett",
        publisher: "John Wiley & Sons",
        cover: "http://i.imgur.com/C3Z8fik.png",
        isbn_13: "978-1118531648",
        isbn_10: "1118531647",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/JavaScript+and+jQuery+-+Duckett.pdf"
    },
    {
        title: "Principles of Information Systems (Available Titles Skills Assessment Manager (SAM) - Office 2010)",
        author: "Ralph Stair | George Reynolds",
        publisher: "Course Technology",
        cover: "http://i.imgur.com/ZqXPeTv.png",
        isbn_13: "978-0324665284",
        isbn_10: "0324665288",
        edition: "9th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Principles_of_Information_Systems__A_Managerial_Approach.pdf"
    },
    {
        title: "The Shoemaker and the Tea Party: Memory and the American Revolution",
        author: "Alfred F. Young",
        publisher: "Beacon Press",
        cover: "http://i.imgur.com/ooSBx1j.png",
        isbn_13: "978-0807054055",
        isbn_10: "0807054054",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/The-Shoemaker-and-the-Tea-Party-Memory-and-the-American-Revolution.pdf"
    },
    {
        title: "Understanding Movies",
        author: "Louis Giannetti",
        publisher: "Pearson",
        cover: "http://i.imgur.com/gRmmLcH.png",
        isbn_13: "978-0205856169",
        isbn_10: "0205856160",
        edition: "13th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Understanding+movies.pdf"
    },
    {
        title: "Database Processing: Fundamentals, Design, and Implementation",
        author: "David M. Kroenke | David J. Auer",
        publisher: "Pearson",
        cover: "http://i.imgur.com/pgMY4xX.png",
        isbn_13: "978-0133058352",
        isbn_10: "0133058352",
        edition: "13th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/David+M.+Kroenke%2C+David+J.+Auer-Database+Processing++Fundamentals%2C+Design%2C+and+Implementation+(13th+Edition)-Prentice+Hall+(2013).pdf"
    },
    {
        title: "Database Processing: Fundamentals, Design, and Implementation (International)",
        author: "David M. Kroenke | David J. Auer",
        publisher: "FT Publishing International",
        cover: "http://i.imgur.com/Ga2GZxY.png",
        isbn_13: "978-1292004860",
        isbn_10: "129200486X",
        edition: "13th (International)",
        download: "https://s3-us-west-1.amazonaws.com/f-society/David+M.+Kroenke%2C+David+J.+Auer-Database+Processing_+Fundamentals%2C+Design%2C+and+Implementation-FT+Publishing+International+(2014).pdf"
    },
    {
        title: "Characteristics of Games",
        author: "George Skaff Elias | Richard Garfield | K. Robert Gutschera | Eric Zimmerman | Peter Whitley",
        publisher: "The MIT Press",
        cover: "http://i.imgur.com/KGxSYD6.png",
        isbn_13: "978-0262017138",
        isbn_10: "026201713X",
        edition: "12th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Characteristics+of+Games_nodrm.pdf"
    },
    {
        title: "Digital Design – A Critical Introduction",
        author: "Dean Bruton | Antony Radford",
        publisher: "Bloomsbury Academic",
        cover: "http://i.imgur.com/q7IwdTe.png",
        isbn_13: "978-1847888280",
        isbn_10: "1847888283",
        edition: "0th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Digital+Design+–+A+Critical+Introduction_nodrm.pdf"
    },
    {
        title: "Publishing E-Books For Dummies",
        author: "Ali Luke",
        publisher: "For Dummies",
        cover: "http://i.imgur.com/R0JgdXF.png",
        isbn_13: "978-1118342909",
        isbn_10: "1118342909",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Publishing+E-Books+For+Dummies_nodrm.pdf"
    },
    {
        title: "Introductory Algebra with P.O.W.E.R. Learning",
        author: "Sherri Messersmith | Lawrence Perez | Robert Feldman",
        publisher: " McGraw-Hill Education",
        cover: "http://i.imgur.com/cd8u3uX.png",
        isbn_13: "978-0073406268",
        isbn_10: "0073406260",
        edition: "1st",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Introductory+Algebra+with+P.O.W.E.R.+Learning%2C+1st+edition_nodrm.pdf"
    },
    {
        title: "Summary & Study Guide For Cause and Comrades: Why Men Fought in the Civil War by James M. McPherson",
        author: "BookRags",
        publisher: "BookRags",
        cover: "http://i.imgur.com/n4xMXQQ.png",
        isbn_13: "",
        isbn_10: "",
        edition: "0th",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Summary+%26+Study+Guide+For+Cause+and+Comrades+–+Why+Men+Fought+in+the+Civil+War+by+James+M.+McPherson_nodrm.pdf"
    },
    {
        title: "Writers Workshop of Science Fiction & Fantasy",
        author: "Michael Knost | Matthew Perry | Bonnie Wasson",
        publisher: "Seventh Star Press",
        cover: "http://i.imgur.com/gDNu2Ck.png",
        isbn_13: "978-1937929619",
        isbn_10: "1937929612",
        edition: "paperback",
        download: "https://s3-us-west-1.amazonaws.com/f-society/Writers+Workshop+of+Science+Fiction+%26+Fantasy_nodrm.pdf"
    }
];


tmpBooks.forEach(function (data) {
    // console.log(data);
    var key = b();
    db.put(key,JSON.stringify(data
    ), function(err){
        if (err) console.log('put error:',err);
        db.get('1235', function(err, data){
            if (err) console.log('get error:',err);
        });
    });
});

let t = (cb) => {
    let tmp = [];
    db.createReadStream()
        .on('data', function (data) {
            let tvar = JSON.parse(data.value);
            tvar.id = data.key;
            tmp.push(tvar);
        })
        .on('error', function (err) {
            console.log('Oh my!', err);
        })
        .on('close', function () {
            console.log('Stream closed');
        })
        .on('end', function () {
            books = tmp;
            cb();
        });
};

t(() => console.log(books));

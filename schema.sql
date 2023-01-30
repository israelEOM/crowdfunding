CREATE DATABASE crowdfunding;
USE crowdfunding;

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    walletAddress VARCHAR(100) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT true,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE campaign (
    id VARCHAR(100) PRIMARY KEY,
    userId INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    deadline BIGINT NOT NULL,
    target INTEGER NOT NULL,
    amountCollected INTEGER NOT NULL DEFAULT 0,
    image TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE campaign_donation (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    amount INTEGER NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO user (username, walletAddress)
VALUES
('Israel Medeiros', '0x932E7DAf3dF6513759a88bcA6c383cD19E05DDd4'),
('Nathiellen Oliveira', '0xa4e12eE4271e098364471b2D6E6aC94a35AE7a44');

INSERT INTO campaign (id, userId, title, description, deadline, target, image)
VALUES
(md5('Campaign Test 1'), 1, 'Campaign Test 1', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 1678262400000, 30000, 'https://scontent-dub4-1.xx.fbcdn.net/v/t1.6435-9/33114672_1714541551928038_7199718381967114240_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=kuJX_OcXEj0AX83ZlpE&_nc_ht=scontent-dub4-1.xx&oh=00_AfDZ2nx_7Wl9fUISGqki0Qt0yu3ub5vLYatKKWZ2FOeZLg&oe=63FF2878'),
(md5('Campaign Test 2'), 1, 'Campaign Test 2', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 1680937200000, 45000, 'https://cdn.pixabay.com/photo/2020/09/19/19/37/landscape-5585247_960_720.jpg'),
(md5('Campaign Test 3'), 1, 'Campaign Test 3', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 1681542000000, 1200, 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_960_720.jpg'),
(md5('Campaign Test 4'), 1, 'Campaign Test 4', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 1689404400000, 100000, 'https://cdn.pixabay.com/photo/2017/01/28/17/43/fish-2016013_960_720.jpg'),
(md5('Campaign Test 5'), 1, 'Campaign Test 5', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 1688194800000, 500000, 'https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341__340.jpg'),
(md5('Campaign Test 6'), 2, 'Campaign Test 6', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 1689750000000, 5400, 'https://cdn.pixabay.com/photo/2020/05/31/16/53/bookmarks-5243253__340.jpg'),
(md5('Campaign Test 7'), 2, 'Campaign Test 7', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 1702972800000, 15000, 'https://media.istockphoto.com/id/1133924836/photo/programming-code-abstract-technology-background-of-software-developer-and-computer-script.jpg?s=612x612&w=0&k=20&c=qgSlKBhrhnDy48pBa54Y1muEQP18E2pfCsW88qSNGro='),
(md5('Campaign Test 8'), 2, 'Campaign Test 8', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 1701763200000, 21000, 'https://media.istockphoto.com/id/1219980553/photo/online-news-on-a-smartphone-and-laptop-woman-reading-news-or-articles-in-a-mobile-phone.jpg?s=612x612&w=0&k=20&c=QodY8pXN5DbLs3-FhwWhhYKnsOE4Iixky_SwdGitwnQ='),
(md5('Campaign Test 9'), 2, 'Campaign Test 9', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 1703491200000, 3000000, 'https://media.istockphoto.com/id/1288092444/photo/student-using-laptop-having-online-class-with-teacher.jpg?s=612x612&w=0&k=20&c=hI_apluBFBOEzizTYeXzFd26r9Z6QyawI8_Ta9-_sDM='),
(md5('Campaign Test 10'), 2, 'Campaign Test 10', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 1695625200000, 850000, 'https://media.istockphoto.com/id/1349390515/photo/paperless-workplace-idea-e-signing-electronic-signature-document-management-businessman-signs.jpg?s=612x612&w=0&k=20&c=EyQl13diegNV5DVLnb0krcAcRDhL7NiSA7IEVImZs6Q=');
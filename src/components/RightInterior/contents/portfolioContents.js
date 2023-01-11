import { ModalHuge, ModalFlag, ModalVom } from '../../../utils/useModal';
import { selectOptions as page } from '../../LeftInterior/sections/PortfolioSelect';

class Portfolio {
    constructor(classification, title, language, description, study, range, img, link) {
        this.classification = classification;
        this.title = title;
        this.language = language;
        this.description = description;
        this.study = study;
        this.range = range;
        this.img = img;
        this.link = link;
    }
}

export const cyland = new Portfolio(
    "【 Front-end Development 】",
    "CYLAND",
    "React, Firebase",
    "현재 사이트 (포트폴리오 소개)",
    "React Router, Styled Component, Firestore 데이터베이스, OOP",
    "메인 컴포넌트 + 라우터 컴포넌트 3",
    "/images/portfolio/cyland.jpg",
    {
        코드: "https://github.com/H-Genie/cyland"
    }
)

export const pagination = new Portfolio(
    "【 Full-stack Development 】",
    "Pagination",
    "Node.js, MongoDB, React",
    "페이지네이션, 필터링, 소팅",
    "백엔드(REST API 설계, 인덱싱) \n 프런트엔드(React Context, 페이지네이션 로직)",
    "메인 컴포넌트, 상세 컴포넌트 (토글)",
    "/images/portfolio/pagination.jpg",
    {
        포트폴리오: page[1].value,
        코드: "https://github.com/H-Genie/pagination"
    }
)

export const pokemon = new Portfolio(
    "【 Front-end Development 】",
    "Pocketmon",
    "React, TypeScript",
    "포켓몬스터 캐릭터 도감",
    "타입스크립트(타입, 배열, 튜플, 객체, 인터페이스, 함수), 데이터 페칭(React-Query)",
    "메인 컴포넌트, 캐릭터별 라우터, 캐릭터 상세정보 컴포넌트(탭)",
    "/images/portfolio/pokemon.jpg",
    {
        포트폴리오: page[2].value,
        코드: "https://github.com/H-Genie/pokemon"
    }
)

export const movieapp = new Portfolio(
    "【 Front-end Development 】",
    "Movie App",

    "React",
    "영화&배우 프로필 소개 페이지",
    "React Router, Ant Design, 데이터 페칭(Axios + useEffect), 배열 관리",
    "메인 컴포넌트 + 영화 상세 라우터 + 배우 상세 라우터",
    "/images/portfolio/movieapp.jpg",
    {
        포트폴리오: page[3].value,
        코드: "https://github.com/H-Genie/movieapp"
    }
)

export const todo = new Portfolio(
    "【 Front-end Development 】",
    "To Do List App",
    "React, Redux, Firebase",
    "실제 활용 가능한 투두 리스트 (개인인증, DB 저장) \n\n 파이어베이스(구글 인증, 실시간 DB) 활용한 리액트 프로젝트 \n 기능 : 추가, 수정, 삭제, 순서변경 \n 인증정보 Redux로 관리",
    "React Hook, 상태관리 (Redux-Toolkit), Firestore 데이터베이스, 구글 Authentication",
    "메인 컴포넌트",
    "/images/portfolio/todo.jpg",
    {
        포트폴리오: page[4].value,
        코드: "https://github.com/H-Genie/todo"
    }
)

export const genesis = new Portfolio(
    "【 Web Publishing 】",
    "GENESIS",
    "HTML, CSS, JavaScript",
    "과정 수료 후 웹퍼블리싱 종합 프로젝트 \n 멀티플 캐러셀 구현에 초점",
    "CSS 선택자 심화, 스크롤 이벤트",
    "메인페이지 / 반응형",
    "/images/portfolio/genesis.jpg",
    {
        포트폴리오: page[5].value,
        코드: "https://github.com/H-Genie/genesis",
    }
)

export const flag = new Portfolio(
    "【 Web Publishing 】",
    "FLAG GAME",
    "HTML, CSS, JavaScript",
    "청기백기 게임 \n 퍼블리싱 이외의 자바스크립트 활용 연습 \n 백그라운드 로직 설계 연습",
    "Math 오브젝트, Switch문, 파라미터",
    "메인페이지, 백그라운드 로직, 반응형",
    "/images/portfolio/flag.jpg",
    {
        포트폴리오: page[6].value,
        코드: "https://github.com/H-Genie/flag-game",
        로직: <ModalFlag />
    }
)

export const huge = new Portfolio(
    "【 Web Publishing 】",
    "HUGE Inc.",
    "HTML, CSS, JavaScript",
    "코딩 배운 후 첫번째 프로젝트 \n 박스모델과 DOM 구조에 대한 학습 \n 반응형과 자바스크립트 학습 후 디벨롭",
    "박스 모델, 미디어 태그, 클릭 이벤트, 조건문, Date 객체",
    "메인페이지 + 서브페이지 4개 / 반응형",
    "/images/portfolio/huge.jpg",
    {
        포트폴리오: page[7].value,
        코드: "https://github.com/H-Genie/hugeinc",
        박스모델: <ModalHuge />
    }
)

export const netflix = new Portfolio(
    "【 Web Publishing 】",
    "NETFLIX",
    "HTML, CSS, JavaScript",
    "미디어쿼리 실습 프로젝트 \n\n * 넷플릭스 사이트와 똑같아 피싱 사이트로 감지되나, 이용에 문제가 없습니다. \n '세부정보-안전하지 않은 사이트 방문'을 눌러주세요",
    "폼 태그, 반복문, CSS 반응형",
    "메인페이지 / 반응형",
    "/images/portfolio/netflix.jpg",
    {
        포트폴리오: page[8].value,
        코드: "https://github.com/H-Genie/netflix"
    }
)

export const naver = new Portfolio(
    "【 Web Publishing 】",
    "NAVER Corperation",
    "HTML, CSS, JavaScript",
    "자바스크립트 실습 프로젝트 \n 싱글 캐러셀 구현에 초점",
    "CSS 가상요소, 타이밍 이벤트, 이벤트 리스너",
    "메인페이지 / 반응형",
    "/images/portfolio/naver.jpg",
    {
        포트폴리오: page[9].value,
        코드: "https://github.com/H-Genie/naver",
        캐러셀로직: "https://h-genie.github.io/study/javascript_slide.html"
    }
)

export const vom = new Portfolio(
    "【 Business 】",
    "VOM ACADEMY",
    "HTML, CSS, JavaScript, jQuery, PHP, MySQL",
    "실무 : 봄아카데미 홈페이지 개발 및 운영 \n\n 카페24 배포, HTTPS 인증서 적용 \n디자이너와 협업 (Adobe XD 활용) \n 검색엔진 등록 (구글, 네이버, 다음) \n 자동가입 방지 리캡챠 적용",
    "Create Element & Append Child, 모달 박스, This 키워드, Ajax, SQL CRUD, 세션 로그인, bycrypt, Mail 함수, 데이터베이스 설계",
    "메인페이지 6 + 서브페이지 9 + 관리자 페이지 + 백엔드 / 반응형",
    "/images/portfolio/vom.jpg",
    {
        사이트: page[10].value,
        디자인가이드: "https://xd.adobe.com/view/d2c60d54-3c38-4f9b-76b2-f2bffc1012e4-a4f7",
        플로우차트: <ModalVom />
    }
)
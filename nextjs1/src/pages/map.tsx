import React, { useEffect, useState, useRef } from 'react';
import styles from '@/styles/Map.module.scss';

// 전역변수 선언
declare global {

    //리액트 전용 Window - window.open 처럼 자바스크립트에서 사용하던 기능과는 별개
    interface Window {
        kakao: any; //나의 window에서는 kakao가 존재한다.
    }
}

const Map = () => {


    //----------변수만들기
    const mapRef = useRef<HTMLDivElement | null>(null);

    //지도생성
    const [ myMap, setMyMap ] = useState<any>(null);

    //검색 쿼리명
    const [ keyword,  setKeyword ] = useState<string>('');

    //마커
    const [ myMarker, setMyMarker ] = useState<any>(null);

    //load를 했나 안했나를 알려주는 변수
    const [ isLoad, setIsLoad ] = useState<boolean>(false);

    // 커스텀 오버레이
    const [ myOverlay, setMyOverlay ] = useState<any>();

    //추천검색어를 선택할 수 있는 버튼
    const keywordBtns: string[] = ['팔달문', '장안문', '화서문', '창룡문'];



    useEffect(()=>{
        //자바스크립트부터 들고오자 ---------------- service라이브러리 불러오기 https://apis.map.kakao.com/web/guide/
        const mapScript = document.createElement('script');
        // autoload=false를 넣어서 내가 원할때 로딩될 수 있게 만든다
        mapScript.setAttribute('src', `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false&libraries=services`);
        mapScript.async = true; //들고오는 객체 자체에 fetch가 들어가기때문에 무조건 넣어야한다.
        // -----------여기까지 들고오면 이제 샘플에있는걸 편안하게 사용할 수 있다


        const drawMap = () => {
            const center = new window.kakao.maps.LatLng(37.2855250, 127.0076167);
            const options = {
                center, // center: center와 같다.
                level: 3
            }
            //지도생성
            const maps = new window.kakao.maps.Map(mapRef.current, options);
            setMyMap(maps); //내가만든 맵에다가 kakao가 만든 맵 넣어주기.

            //교통상황생성
            maps.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);

            //마커생성
            // const markerPosition = new window.kakao.maps.LatLng(37.2855250, 127.0076167);
            const marker = new window.kakao.maps.Marker({ position: center });
            marker.setMap(maps);
            setMyMarker(marker);

            //초기셋 오버레이 생성
            const content = document.createElement('div');
            content.id = "customOverlay";
            content.style.cssText = `
                background: white;
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 10px;
                font-size: 13px;
                position: relative;
            `;
            const closeButton = document.createElement('div');
            closeButton.id = "customCloseButton";
            closeButton.innerHTML =  'X';
            closeButton.style.cssText = `
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
                font-size: 16px;
            `;
            const info = document.createElement('div');
            info.innerHTML =  `
                <h6>수원 화성의 서문</h6>
                <p>대한민국의 보물 제403호</p>
            `;
            content.appendChild(closeButton);
            content.appendChild(info);
            const overlay = new window.kakao.maps.CustomOverlay({
                content,
                position: center,

                //좌표도 만들기 center는 0.5 / 0.5
                xAnchor: 0.3,
                yAnchor: 0.9
            });
            overlay.setMap(maps);
            setMyOverlay(overlay);
            closeButton.addEventListener('click', ()=>{
                overlay.setMap(null);
            })
        }

        mapScript.onload = ()=>{
            window.kakao.maps.load(drawMap);
        }
        document.head.appendChild(mapScript);

        // 나 세팅 끝났어. 라는 의미.
        setIsLoad(true);
    },[])

    //검색기능 구현
    const searchMap = (searchKeyword: string) => {
        if (!isLoad || !searchKeyword) {
            alert('지도가 로드되지 않았거나 검색어가 없습니다')
            return false;
        }


        // 카카오 검색 기능 구현
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(searchKeyword, placesSearchCB);

        //호이스팅 문제때문에 화살표는 동작하지않아서 function으로 지정
        function placesSearchCB(data: any[], status: string) {
            if (status === window.kakao.maps.services.Status.OK) {

                if (myMarker) myMarker.setMap(null);
                if (myOverlay) myOverlay.setMap(null);

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                const bounds = new window.kakao.maps.LatLngBounds();
                const searchPosition = new window.kakao.maps.LatLng(data[0].y, data[0].x); //새로운 포지션.나중에 써먹으려고 받아뒀다.
                bounds.extend(searchPosition);

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                myMap.setBounds(bounds);


                // 새로운 마커
                const searchMarker = new window.kakao.maps.Marker({position: searchPosition});
                searchMarker.setMap(myMap);
                setMyMarker(searchMarker);

                // 새로운 오버레이
                const content = document.createElement('div');
                content.id = "customOverlay";
                content.style.cssText = `
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 10px;
                    font-size: 13px;
                    position: relative;
                `;
                const closeButton = document.createElement('div');
                closeButton.id = "customCloseButton";
                closeButton.innerHTML = 'X';
                closeButton.style.cssText = `
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    cursor: pointer;
                    font-size: 16px;
                `;
                const info = document.createElement('div');
                info.innerHTML = `
                    <h6>${data[0].place_name}</h6>
                    <p>${data[0].address_name}</p>
                `;
                content.appendChild(closeButton);
                content.appendChild(info);
                const overlay = new window.kakao.maps.CustomOverlay({
                    content,
                    position: searchPosition,

                    //좌표도 만들기 center는 0.5 / 0.5
                    xAnchor: 0.3,
                    yAnchor: 0.9
                });
                overlay.setMap(myMap);
                setMyOverlay(overlay);

                closeButton.addEventListener('click', () => {
                    overlay.setMap(null);
                })
            }

        }
    }
    return (
        <div className={styles.mapbox}>
            <h2>Keyword Map Search</h2>
            <div className={styles.btns}>
                {
                    keywordBtns.map((btn, idx) => (
                        <button key={idx} onClick={()=> setKeyword(btn)}>{btn}</button>
                    ))
                }
            </div>
            <div className={styles.search}>
                <input type="text" placeholder="지역키워드를 입력해주세요"
                       value={keyword}
                       onChange={e=> setKeyword(e.target.value) }/>
                <button onClick={()=>searchMap(keyword)}>Search</button>
            </div>

            <div className={styles.map} ref={mapRef}></div>

        </div>
    );
};

export default Map;
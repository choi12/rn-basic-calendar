# React Native Basic Calendar

[한국어](./README.ko.md) | [English](./README.md)

React Native 앱을 위한 가볍고 커스터마이징 가능한 캘린더 컴포넌트입니다.  
날짜 마킹과 모달 지원과 같은 기본적인 기능들을 제공하며, 한국어와 영어를 모두 지원합니다.

[![npm version](https://img.shields.io/npm/v/%40choi12%2Frn-basic-calendar)](https://www.npmjs.com/package/@choi12/rn-basic-calendar)
[![License](https://img.shields.io/npm/l/%40choi12%2Frn-basic-calendar)](https://github.com/choi12/rn-basic-calendar/blob/main/LICENSE)

## 스크린샷

<p>
  <img src="https://raw.githubusercontent.com/choi12/rn-basic-calendar/main/screenshots/theme-skyblue.png" width="250" alt="skyblue theme">
  <img src="https://raw.githubusercontent.com/choi12/rn-basic-calendar/main/screenshots/theme-dark.png" width="250" alt="dark theme">
</p>

- 왼쪽: 하늘색 테마가 적용된 기본 캘린더
- 오른쪽: 다크 테마로 커스터마이징된 캘린더


## 실제 사용 사례

<p>
  <img src="https://raw.githubusercontent.com/choi12/rn-basic-calendar/main/screenshots/feeddiary.png" width="250" alt="calendar modal in diary app">
</p>

- 새싹일기 - CalendarModal 컴포넌트를 사용하여 날짜를 선택하는 일기 앱
  - [App Store](https://apps.apple.com/kr/app/feed-diary/id6477572993)
  - [Google Play](https://play.google.com/store/apps/details?id=com.choi12.feeddiary)


## 주요 기능

- 📅 단순하고 직관적인 캘린더 인터페이스
- 🎨 커스터마이징 가능한 스타일과 테마
- 🌍 다국어 지원 (한국어 & 영어)
- 📱 크로스 플랫폼 호환성
- 📏 날짜 선택 범위 설정 가능
- 📍 날짜 마킹 지원
- ✨ 오늘 날짜 표시
- 🗓️ 모달 캘린더 뷰


## 설치 방법

1. Package 설치:
```bash
# npm 사용
npm install @choi12/rn-basic-calendar

# yarn 사용
yarn add @choi12/rn-basic-calendar
```

2. Peer dependencies 설치:
```bash
# npm 사용
npm install dayjs@^1.11.0

# yarn 사용
yarn add dayjs@^1.11.0
```

### Peer Dependencies

이 패키지는 다음과 같은 peer dependencies가 필요합니다:

```json
{
    "dayjs": "^1.11.0",
    "react": "^17.0.0 || ^18.0.0",
    "react-native": ">=0.65.0 <1.0.0"
}
```


## 타입

이 패키지는 날짜 처리를 위해 다음과 같은 타입을 사용합니다:

```typescript
type CalendarDay = Dayjs; // 날짜 조작을 위한 dayjs 객체
type MarkedDate = string; // 'YYYY-MM-DD' 형식의 날짜 문자열
```


## 사용 방법

### 기본 캘린더

```typescript
import React, { useState } from 'react';
import { Calendar } from '@choi12/rn-basic-calendar';
import dayjs, { Dayjs } from 'dayjs';

const CalendarExample = () => {
  const [value, setValue] = useState<Dayjs>(dayjs());

  return (
    <Calendar
      value={value}
      onChange={setValue}
      markedDates={['2025-01-02', '2025-01-03']}
    />
  );
};
```

### 캘린더 모달

```typescript
import React, { useState } from 'react';
import { CalendarModal } from '@choi12/rn-basic-calendar';
import dayjs, { Dayjs } from 'dayjs';

const CalendarModalExample = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [value, setValue] = useState<Dayjs>(dayjs());

  return (
    <CalendarModal
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
      value={value}
      onChange={(date) => {
        setValue(date);
        setIsVisible(false);
      }}
    />
  );
};
```


## Props

### Calendar Props

| Prop         | 타입                      | 필수 | 기본값    | 설명                                    |
|--------------|---------------------------|------|-----------|----------------------------------------|
| value        | CalendarDay              | 예   | -         | 현재 선택된 날짜                        |
| onChange     | (date: CalendarDay)=>void| 예   | -         | 날짜가 선택될 때 호출되는 콜백          |
| minDate      | CalendarDay              | 아니오| -         | 선택 가능한 최소 날짜                   |
| maxDate      | CalendarDay              | 아니오| -         | 선택 가능한 최대 날짜                   |
| defaultValue | CalendarDay              | 아니오| dayjs()   | 기본 선택 날짜                         |
| language     | 'en' \| 'ko'             | 아니오| 'en'      | 캘린더 언어                            |
| styles       | CalendarStyles           | 아니오| {}        | 커스텀 스타일 객체                      |
| colors       | CalendarColors           | 아니오| {}        | 커스텀 색상 객체                        |
| markedDates  | string[]                 | 아니오| []        | 표시할 날짜 배열 (YYYY-MM-DD 형식)      |

### CalendarModal Props

Calendar Props를 상속하며 추가적으로 다음 속성들을 가집니다:

| Prop           | 타입       | 필수 | 기본값 | 설명                     |
|----------------|------------|------|--------|-------------------------|
| isVisible      | boolean    | 예   | -      | 모달 표시 여부          |
| onClose        | () => void | 예   | -      | 모달이 닫힐 때 콜백     |
| title          | string     | 아니오| -      | 모달 제목               |
| overlayOpacity | number     | 아니오| 0.4    | 모달 오버레이 투명도    |


## 커스터마이징

### 테마 색상

```typescript
const colors = {
  primaryColor: '#8CD5E1', // Primary theme color
  backgroundColor: '#FFFFFF', // Background color
  textColor: '#4A4A4A', // Text color
};
```

### 컴포넌트 스타일

```typescript
const styles = {
  // Calendar container
  containerStyle: {},
  daysContainerStyle: {},
  weekStyle: {},

  // Day elements
  dayContainerStyle: {},
  dayTextStyle: {},
  selectedDayStyle: {},
  selectedDayTextStyle: {},
  todayLabelStyle: {},
  weekendDayTextStyle: {},
  disabledDayTextStyle: {},

  // Month selector
  monthSelectorContainerStyle: {},
  monthSelectorButtonStyle: {},
  monthTextStyle: {},
  arrowStyle: {},
  disabledArrowStyle: {},

  // Weekday header
  weekdayHeaderContainerStyle: {},
  weekdayTextStyle: {},
  weekendHeaderTextStyle: {},

  // Modal specific
  modalOverlayStyle: {},
  modalContainerStyle: {},
  modalTitleStyle: {},
};
```

### 커스터마이징 전체 예시

```typescript
const customColors = {
  primaryColor: '#8CD5E1',
  backgroundColor: '#333333',
  textColor: '#FFFFFF',
};

const customStyles = {
  containerStyle: { borderRadius: 12 },
  dayTextStyle: { fontSize: 14 },
  selectedDayStyle: { backgroundColor: '#8CD5E1' },
  selectedDayTextStyle: { color: '#FFFFFF' },
  disabledDayTextStyle: { color: '#989797' },
};

<Calendar
  value={value}
  onChange={onChange}
  language="ko"
  defaultValue={dayjs('2025-01-15')}
  minDate={dayjs().subtract(2, 'month')}
  maxDate={dayjs().add(2, 'month')}
  markedDates={['2025-01-02', '2025-01-03']}
  colors={customColors}
  styles={customStyles}
/>
```


## 테스트

이 패키지는 모든 컴포넌트와 유틸리티에 대한 포괄적인 테스트를 포함하고 있습니다:

- **컴포넌트**
  - Calendar: 핵심 캘린더 기능, 날짜 선택, 월 이동, 스타일링
  - CalendarModal: 모달 동작, 상호작용, 커스터마이징
  - WeekdayHeader: 다국어 지원 및 레이아웃
  - MonthSelector: 월 이동 및 경계 처리
  - Day: 날짜 렌더링, 선택, 마커 표시

- **훅**
  - useCalendar: 날짜 그리드 생성 및 월 계산
  - useCalendarState: 상태 관리 및 월 이동

- **유틸리티**
  - Date 유틸리티: 범위 검증, 월 비교, 주말 확인
  - Locale 유틸리티: 영어/한국어 언어 설정

테스트 실행 방법:
```bash
# npm 사용
npm test

# yarn 사용
yarn test
```


## 라이선스

MIT © [choi12](https://github.com/choi12)
### 실습 주제: **Counter** — 책임이 있는 숫자 올리기

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {}
```

# 실습 요구사항

이 실습은 **Solidity의 책임 기반 설계 원칙**을  
카운터라는 단순한 도메인 안에서 체화하는 것을 목표로 합니다.

## 기능 구현 요구사항

1. **계약이 배포될 때, 초기 숫자(count)를 설정할 수 있어야 합니다.**

   - `constructor(uint _initial)`을 사용하세요.
   - 예: `new CounterBox(2)`를 통해 count가 2부터 시작해야 합니다.

2. **오직 배포자만 숫자를 1 증가시킬 수 있어야 합니다.**

   - `increment()` 함수는 `owner`만 실행 가능해야 합니다.
   - `modifier onlyOwner`를 사용해 접근을 제한하세요.

3. **현재 숫자(count)를 읽을 수 있는 함수가 있어야 합니다.**

   - `getCount()` 함수는 `view` 함수여야 하며,
   - 상태를 변화시키지 않아야 합니다.

4. **현재 숫자가 특정 기준보다 큰지 확인하는 함수가 있어야 합니다.**

   - 함수명은 `isOver(uint target)`
   - 예: `isOver(5)`를 호출하면 `count > 5`인지 true/false를 반환해야 합니다.
   - `view` 함수로 작성하세요.

5. **단순한 숫자 계산을 위한 순수 계산 함수가 있어야 합니다.**
   - 함수명은 `sum(uint a, uint b)`
   - `pure` 함수로 작성해야 하며,
   - `a + b` 결과만 반환해야 합니다.

## 실행 흐름 및 결과 목표

1. **CounterBox를 `count = 2`로 시작되도록 배포하세요.**
2. **배포자(owner)가 `increment()`를 3번 실행하세요.**
3. **그 결과 `getCount()`를 호출하면 `5`가 출력되어야 합니다.**
4. **다른 계정이 `increment()`를 호출하면 실패해야 합니다.**
5. **`isOver(3)` 호출 결과는 `true`여야 합니다.**
6. **`sum(10, 20)` 호출 결과는 `30`이어야 합니다.**

## 구현 방법

- 간단한 웹 UI로 `increment`, `getCount`, `isOver`, `sum` 기능 구현
- 메타마스크로 연결
- 실행 결과를 페이지 상에 출력

## 이더스캔 결과 첨부 필수

- 배포 네트워크는 스토리 아이네이스 테스트넷에 배포하고 트랜잭션 상호작용 하세요.
- **Etherscan 주소 스크린샷 또는 URL을 제출**하세요.
  - 예: `https://sepolia.etherscan.io/address/0x1234...`
  - 필수 확인 항목: `getCount()` 실행 결과가 5임을 증명

## 최종 제출물 (반드시 포함)

- git에 업로드 250429_study
- 선택한 구현 방식 결과물
- **이더스캔 URL**

## 최종 시나리오 참고 사항

1. `new CounterBox(2)`로 배포
2. `increment()` 3회 → 총 count는 5
3. `getCount()` 결과 → 5
4. `isOver(4)` → true
5. `sum(10, 20)` → 30
6. 이더스캔에서 `count` 상태를 확인 → 5

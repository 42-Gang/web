// Friends List - Block/UnBlock 상태 관리

import axios from "axios";

/**
 * 친구 차단 요청
 * @param userId 상대방 사용자 ID
 */
export const blockFriend = async (userId: string) => {
  try {
    const res = await axios.patch(`/api/friends/${userId}/block`);
    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

/**
 * 친구 차단 해제 요청
 * @param userId 상대방 사용자 ID
 */
export const unblockFriend = async (userId: string) => {
  try {
    const res = await axios.patch(`/api/friends/${userId}/unblock`);
    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

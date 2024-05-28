let myId = ""
let otherUserId=""

const setMyId = (id: string) => {
    myId = id

}

const getMyId = (): string => {
    return myId
}

const setOtherUserId = (id: string) => {
    otherUserId = id
}

const getOtherUserId = (): string => {
    return otherUserId
}

export const CallInfo={
    setMyId,
    getMyId,
    setOtherUserId,
    getOtherUserId,

}

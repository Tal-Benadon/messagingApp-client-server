

export default function messageFormatting(membersList, userId) {
    console.log({ membersList });
    const noUserMemberList = membersList.filter(member => member._id !== userId)
    if (noUserMemberList.length < 1) {
        return "No recepients yet"
    }
    // console.log(membersList);
    // console.log(membersList[1]._id);
    // console.log(userId);



    const extraMembers = noUserMemberList.length - 2
    console.log(noUserMemberList);
    if (noUserMemberList.length > 2) {
        const namesTitle = `${noUserMemberList[0].fullName}, ${noUserMemberList[1]?.fullName} +${extraMembers}`
        return namesTitle
    }
    if (noUserMemberList.length === 2) {
        const namesTitle = `${noUserMemberList[0].fullName}, ${noUserMemberList[1]?.fullName}`
        return namesTitle
    } else {
        const namesTitle = noUserMemberList[0].fullName
        return namesTitle
    }

}

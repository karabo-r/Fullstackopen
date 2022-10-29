export default function orderedList(data){
    return data.sort((a, b) => b.likes - a.likes);
}
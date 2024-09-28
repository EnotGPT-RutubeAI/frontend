import { useContext } from 'react'
import { contextVideoPlayer } from '../context/VideoPlayerContext'

function findWords(arr) {
  let textSubtitles = arr
  let newArray = []
  let biba = textSubtitles.length
  for (let i = 0; i < biba; i++) {
    let elem = textSubtitles[i]

    let splited = textSubtitles[i]['text'].split(' ')
    let countWords = splited.length - 1
    let duration = elem['timestamp'][1] - elem['timestamp'][0]
    let oneWord = duration / countWords

    if (countWords > 1) {
      for (let j = 1; j < countWords + 1; j++) {
        newArray.push({
          timestamp: [
            textSubtitles[i]['timestamp'][0] + oneWord * (j - 1),
            textSubtitles[i]['timestamp'][0] + oneWord * j
          ],
          text: splited[j]
        })
      }
    }
  }
  return newArray
}

export function FindTimestampEnd({
  timestamp_start,
  timestamp_end,
  arr,
  all_arr
}) {
  if (all_arr == []) {
    return timestamp_end
  }
  let arr1 = arr.sort((a, b) => {
    return a.timestamp[0] > b.timestamp[0] ? 1 : -1
  })
  let all_arr1 = findWords(all_arr)
  const finded = all_arr1.findIndex(
    (elem, ind) => elem.timestamp[1] >= timestamp_end
  )

  const end =
    all_arr1
      .slice(finded)
      .findIndex(
        (elem) =>
          elem.text.includes('.') && elem.timestamp[1] - timestamp_start > 20
      ) + finded
  let textSum = ''
  const arrToSum = all_arr1.slice(finded - 1, end)
  for (let i = 0; i < arrToSum.length; i++) {
    textSum += arrToSum[i].text + ' '
  }
  let arryki = []
  if (all_arr1[end].timestamp) arryki = [all_arr1[end].timestamp[1], textSum]
  else if (finded + 1 != all_arr1.length)
    arryki = [all_arr1[finded + 1].timestamp[1], textSum]
  else arryki = [all_arr1[finded].timestamp[1], textSum]

  return {
    text: arryki[1],
    timestamp: [timestamp_start, arryki[0]]
  }
}

export function TimestampsNoRepeats({
  timestamp_start,
  timestamp_end,
  arr,
  all_arr
}) {
  if (all_arr == []) {
    return timestamp_end
  }
  let arr1 = arr.sort((a, b) => {
    return a.timestamp[0] > b.timestamp[0] ? 1 : -1
  })
  let all_arr1 = findWords(all_arr)
  const finded = all_arr1.findIndex(
    (elem, ind) => elem.timestamp[1] >= timestamp_end
  )

  const end =
    all_arr1
      .slice(finded)
      .findIndex(
        (elem) =>
          elem.text.includes('.') && elem.timestamp[1] - timestamp_start > 20
      ) + finded

  let arryki = []
  if (all_arr1[end].timestamp) arryki = all_arr1[end].timestamp[1]
  else if (finded + 1 != all_arr1.length)
    arryki = all_arr1[finded + 1].timestamp[1]
  else arryki = all_arr1[finded].timestamp[1]
  return DeleteDublicates(arryki)
}

export function DeleteDublicates(arr) {
  let tmp = []
  let ends = []
  for (let i = 0; i < arr.length; i++) {
    console.log(arr)
    if (!ends.includes(arr[i].timestamp[1])) {
      tmp.push(arr[i])
      ends.push(arr[i].timestamp[1])
    }
  }
  return tmp
}

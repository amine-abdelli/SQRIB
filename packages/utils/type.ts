export interface ScoreType {
    id: string
    type: string
    mpm: number
    wrong_words: number
    correct_letters: number
    total_letters: number
    wrong_letters: number
    precision: number
    points: number
    createdAt: Date | null | string
    userId: string | null
    gameId: string | null
    username: string | null
    language: string | null
    timer: number | null
}

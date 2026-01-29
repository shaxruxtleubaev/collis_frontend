export interface UserProfile {
  id: number
  username: string
  email: string
  user_type: 'ADMIN' | 'LECTURER' | 'STUDENT'
  user_type_display: string
  fullname: string
  user_id: string
}

export interface Course {
  course_code: string
  title: string
  credits: number
  created_at: string
  updated_at: string
}

export interface Group {
  id: number
  name: string
  intake: string
  student_count: string
  created_at: string
  updated_at: string
}

export interface Lecturer {
  lecturer_id: string
  fullname: string
  email: string
  created_at: string
  updated_at: string
}

export interface Room {
  id: number
  building: string
  hall: string
  capacity: number
  created_at: string
  updated_at: string
}
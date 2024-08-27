// app/api/data/route.ts
import { NextResponse } from 'next/server'

import { query } from '../../../../lib/db'

export async function GET() {
  try {
    const result = await query('SELECT * FROM data')

    return NextResponse.json({ status: 1, data: result.rows })
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching Data', error }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { action, firstName, lastName, email, password, mobile, data_id } = await req.json()

    if (action === 'insert') {
      // Example: Add a new user
      const insertData = await query(
        'INSERT INTO data (firstName, lastName, email, password, mobile) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [firstName, lastName, email, password, mobile]
      )

      return NextResponse.json(
        { status: 1, data: insertData.rows[0], description: 'Data added successfully' },
        { status: 201 }
      )
    } else if (action === 'update') {
      const updateData = await query(
        'UPDATE data SET firstname = $1, lastname = $2, email = $3, password=$4, mobile=$5 WHERE data_id = $6 RETURNING *',
        [firstName, lastName, email, password, mobile, data_id]
      )

      console.log(updateData)

      return NextResponse.json({ status: 1, data: updateData.rows[0], description: 'Data updated successfully' })
    } else if (action === 'delete') {
      await query('DELETE FROM data WHERE data_id = $1', [data_id])

      return NextResponse.json({ status: 1, data: null, description: 'Data Deleted successfully' })
    } else {
      return NextResponse.json({ message: 'Invalid POST request action' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request', error }, { status: 500 })
  }
}

import express from 'express'
import auth from './authenticationRoute'
import user from './userRoute'
import videos from './videoRoute'
import category from './categoryRoute'

export default (app: any) => {
    app.use(
        express.json(),
        auth,
        user,
        videos,
        category,
    )
}


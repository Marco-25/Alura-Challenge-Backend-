import express from 'express'
import auth from './authenticationRoute'
import user from './userRoute'
import videos from './VideoRoute'

export default (app: any) => {
    app.use(
        express.json(),
        auth,
        user,
        videos,
    )
}


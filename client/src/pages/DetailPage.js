import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../contexts/AuthContext'
import { LinkCard } from '../components/LinkCard'
import { Loader } from '../components/Loader'

export const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState(null)
  const linkid = useParams().id

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkid}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setLink(fetched)
    } catch (e) {}
  }, [token, linkid, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }

  return <>{!loading && link && <LinkCard link={link} />}</>
}

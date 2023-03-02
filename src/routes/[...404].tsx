
import { PageLayout } from '~/components/layout/PageLayout';
import { Button } from '~/components/Button';
import { useNavigate } from 'solid-start';

export default function PageNotFound() {
  const navigate = useNavigate()

  return <PageLayout>
    <h2>Oops, cette page n'existe pas.</h2>
    <Button onClick={() => navigate('/')}>Retourner à l'accueil</Button>
  </PageLayout>
}

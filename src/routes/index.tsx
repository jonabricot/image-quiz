import { useNavigate } from "solid-start";
import { Button } from "~/components/Button";
import { Center } from "~/components/layout/Center";
import { PageLayout } from "~/components/layout/PageLayout";

export default function Home() {
  const navigate = useNavigate()

  return <PageLayout>
    <Center>
      <Button onClick={() => navigate('/quiz/lolo')}>Go to lolo quiz</Button>
    </Center>
  </PageLayout>
}

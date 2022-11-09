import GradientLayout from '../components/GradientLayout'

const Home = () => {
  return (
    <GradientLayout
      color="red"
      subtitle="profile"
      title="Art Vandelay"
      description="15 public playlists"
      image="https://frontendmasters.github.io/fullstack-app-next-website/images/profile.png"
      roundImage
    >
      <div>homepage</div>
    </GradientLayout>
  )
}

export default Home

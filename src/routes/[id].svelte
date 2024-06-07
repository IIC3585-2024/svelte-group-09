<script context="module">
    export async function load({ params, fetch }) {
      const id = params.id;
      const res = await fetch(`/api/getActivityDetails?id=${id}`, {
        headers: {
          Authorization: `Bearer ${EVENT_API_TOKEN}`
        }
      });
  
      if (!res.ok) {
        return { status: res.status, error: new Error(`Could not fetch details for activity with id ${id}`) };
      }
  
      const activityDetails = await res.json();
      return { props: { activityDetails } };
    }
</script>
  
<script>
    export let activityDetails;
</script>
  
<style>
    .center-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      padding: 20px;
      background: white;
      border: 1px solid #ccc;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
</style>
  
<div class="center-box">
    <h1 class="text-xl font-semibold mb-4">{activityDetails.title}</h1>
    <p><strong>Aspectos de Seguridad:</strong> {activityDetails.safety}</p>
    <p><strong>Equipamiento:</strong> {activityDetails.equipment}</p>
</div>
  
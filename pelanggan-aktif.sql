--Meeting 2022-09-21

select a.name,a.telp,'' email,c.username,'' activities,b.city,case b.branch_id when '1' then '01' when '2' then '02' when '3' then '01' when '4' then '03' end ou,b.address from fbs a  left outer join clients b on b.id=a.client_id left outer join users c on c.id=b.sale_id where a.status="1" and a.expirystatus="0" and b.active="1" and b.status="1";

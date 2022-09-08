var args = {
	act: "overall_search_role",
	level: $("level").value,
	wushanshi: $("wushanshi").value
};
args = get_order_by_val(args, "expire_time DESC");
args["page"] = 2;
submit_advance_search(args);
